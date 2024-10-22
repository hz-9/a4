/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 22:25:11
 */
import * as fs from '@hz-9/a4-core/fs-extra'
import type { ClientOptions } from '@elastic/elasticsearch'
import type { IndicesGetResponse } from '@elastic/elasticsearch/lib/api/types'
import { A4ConfigBase, A4Util, IA4Config, RunEnv } from '@hz-9/a4-core'
import { DynamicModule, FactoryProvider, Module } from '@nestjs/common'
import { OpenSearchMappingService } from '@scalenc/opensearch-mapping-ts'
import { defer, lastValueFrom } from 'rxjs'

import {
  A4_DEFAULT_DATA_SOURCE_NAME,
  A4_ELASTICSEARCH_INDEX_NAME_IN_METADATA,
  CRUD_ELASTICSEARCH_MODULE_DEFAULT,
} from '../const'
import { A4ElasticSearchCrudModuleOptions, DataSourceOptionsExtraWithDefault, Index } from '../interface'
import { ElasticsearchClient } from '../plugin/elasticsearch_'
import { A4ElasticSearchCrudModuleSchema, A4ElasticSearchCrudModuleSchemaA } from '../schema'
import { getElasticSearchCrudToken, getIndexToken, splitExtraOptions } from '../util'
import { A4ElasticSearchCrud } from './elastic-search.crud'
import { A4ElasticSearchCrudModuleBase } from './elastic-search.crud.module-definition'
import { ElasticSearchDataSourceGroup } from './elastic-search.datasource-group'
import { IndicesStorage } from './indices.storage'

interface IA4ElasticSearchIndexGroup {
  indexName: string
  index: IndicesGetResponse
  client: ElasticsearchClient
}

/**
 * @public
 *
 *  `A4 CRUD ElasticSearch` 核心模块类。
 *
 */
@Module({})
export class A4ElasticSearchCrudModule extends A4ElasticSearchCrudModuleBase {
  public static configToOptions(
    config: A4ElasticSearchCrudModuleSchema,
    a4Config: IA4Config<A4ElasticSearchCrudModuleSchemaA> = new A4ConfigBase<A4ElasticSearchCrudModuleSchemaA>()
  ): A4ElasticSearchCrudModuleOptions {
    const options: A4ElasticSearchCrudModuleOptions = {}

    const names = Object.getOwnPropertyNames(config)

    while (names.length) {
      const name = names.shift()!
      const c = config[name as keyof typeof config]

      // 将 ca.crt 从文件路径读取为文件内容。
      if (c.tls?.ca && typeof c.tls.ca === 'string') {
        const { ca } = c.tls
        c.tls.ca = fs.readFileSync(A4Util.noAbsoluteWith(ca, a4Config.cwd))
      }

      options[name] = {
        ...c,

        synchronize: RunEnv.isDev ? c.synchronize ?? true : false,

        retryAttempts: c.retryAttempts ?? CRUD_ELASTICSEARCH_MODULE_DEFAULT.RETRY_ATTMPTS,
        retryDelay: c.retryDelay ?? CRUD_ELASTICSEARCH_MODULE_DEFAULT.RETRY_DELAY,
        verboseRetryLog: c.verboseRetryLog ?? CRUD_ELASTICSEARCH_MODULE_DEFAULT.VERBOSE_RESTRY_LOG,
      }
    }

    return options
  }

  public static async optionsToProvideClassConstructorOptions(
    options: A4ElasticSearchCrudModuleOptions
  ): Promise<Record<string, ElasticsearchClient>> {
    const _createDataSource = async (
      dbName: string,
      dbOptions: DataSourceOptionsExtraWithDefault
    ): Promise<ElasticsearchClient> => {
      const createClient = (o: ClientOptions): ElasticsearchClient => new ElasticsearchClient(dbOptions)

      const [dataSourceOptions, customOptions] = splitExtraOptions(dbOptions)

      const dataSource: ElasticsearchClient = await lastValueFrom(
        defer(async () => {
          const client = await createClient(dataSourceOptions)

          // 数据库初始化。
          await client.ping()

          /**
           * Sync Index。
           */
          if (customOptions.synchronize) {
            const mappings = OpenSearchMappingService.getInstance().getMappings()

            const indexNames: string[] = IndicesStorage.getIndicesByDataSource(dbName).map((i) =>
              Reflect.getMetadata(A4_ELASTICSEARCH_INDEX_NAME_IN_METADATA, i)
            )

            await Promise.all(
              mappings.map(async (mapping) => {
                const indexName: string = mapping.osmapping.index

                if (indexNames.includes(indexName)) {
                  const exists = await client.indices.exists({ index: indexName })
                  if (!exists) {
                    await client.indices.create({
                      index: indexName,
                    })
                  }

                  // 更新索引
                  await client.indices.putMapping({
                    index: indexName,
                    properties: mapping.osmapping.body.properties,
                  })
                }
              })
            )
          }

          return client
        }).pipe(
          A4Util.handleRetry(
            dbName,
            dbOptions.retryDelay,
            dbOptions.retryAttempts,
            dbOptions.verboseRetryLog,
            this.logger
          )
        )
      )

      return dataSource
    }
    const group: Record<string, ElasticsearchClient> = {}

    const names = Object.getOwnPropertyNames(options)

    while (names.length) {
      const name = names.shift()!
      group[name] = await _createDataSource(name, options[name])
    }

    return group
  }

  public static forFeature(indices: Index[] = [], dbName: string = A4_DEFAULT_DATA_SOURCE_NAME): DynamicModule {
    IndicesStorage.addIndicesByDataSource(dbName, [...indices])

    /**
     * 对每个 Entity 都设置对应的  Repository。
     */
    const providers: Array<FactoryProvider> = []

    indices.forEach((index: Index) => {
      providers.push({
        inject: [ElasticSearchDataSourceGroup],
        provide: getIndexToken(index, dbName),
        useFactory: async (elasticSearchDataSourceGroup: ElasticSearchDataSourceGroup) => {
          const client: ElasticsearchClient | undefined = elasticSearchDataSourceGroup.options[dbName]
          if (!client) throw new Error(`Not found '${dbName}' dataSource.`)

          const indexName = Reflect.getMetadata(A4_ELASTICSEARCH_INDEX_NAME_IN_METADATA, index)

          const i = await client.indices.get({ index: indexName })

          return {
            indexName,
            index: i,
            client,
          }
        },
      })

      providers.push({
        inject: [getIndexToken(index, dbName)],
        provide: getElasticSearchCrudToken(index, dbName),
        useFactory: async (o: IA4ElasticSearchIndexGroup) => new A4ElasticSearchCrud(o.client, o.indexName),
      })
    })

    const exportKeys: string[] = providers.map((i) => i.provide as string)

    return {
      module: A4ElasticSearchCrudModule,
      providers,
      exports: exportKeys,
    }
  }
}
