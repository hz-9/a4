/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 19:53:09
 */
import { A4Util, IObjectLiteral, RunEnv } from '@hz-9/a4-core'
import { DynamicModule, FactoryProvider, Module } from '@nestjs/common'
import { defer, lastValueFrom } from 'rxjs'
import { DataSource, type DataSourceOptions, type Repository } from 'typeorm'

import { A4_DEFAULT_DATA_SOURCE_NAME, CRUD_TYPEORM_MODULE_DEFAULT } from '../const'
import { A4TypeORMCrudModuleOptions, DataSourceOptionsExtraWithDefault, EntityClassOrSchema } from '../interface'
import { A4TypeORMCrudModuleSchema } from '../schema'
import { getRepositoryToken, getTypeORMCrudToken, splitExtraOptions } from '../util'
import { EntitiesStorage } from './entities.storage'
import { A4TypeORMCrud } from './typeorm.crud'
import { A4TypeORMCrudModuleBase } from './typeorm.crud.module-definition'
import { TyprORMDataSourceGroup } from './typeorm.datasource-group'

/**
 * @public
 *
 *  `A4 CRUD TypeORM` 核心模块类。
 *
 */
@Module({})
export class A4TypeORMCrudModule extends A4TypeORMCrudModuleBase {
  public static configToOptions(config: A4TypeORMCrudModuleSchema): A4TypeORMCrudModuleOptions {
    const newConfig: A4TypeORMCrudModuleOptions = {}

    const names = Object.getOwnPropertyNames(config)

    while (names.length) {
      const name = names.shift()!
      const c = config[name as 'default']

      newConfig[name] = {
        ...c,

        synchronize: RunEnv.isDev ? c.synchronize ?? true : false,

        autoLoadEntities: c.autoLoadEntities ?? CRUD_TYPEORM_MODULE_DEFAULT.AUTO_LOAD_ENTITIES,
        retryAttempts: c.retryAttempts ?? CRUD_TYPEORM_MODULE_DEFAULT.RETRY_ATTMPTS,
        retryDelay: c.retryDelay ?? CRUD_TYPEORM_MODULE_DEFAULT.RETRY_DELAY,
        verboseRetryLog: c.verboseRetryLog ?? CRUD_TYPEORM_MODULE_DEFAULT.VERBOSE_RESTRY_LOG,
      }
    }

    return newConfig
  }

  public static async optionsToProvideClassConstructorOptions(
    options: A4TypeORMCrudModuleOptions
  ): Promise<Record<string, DataSource>> {
    const _createDataSource = async (
      dbName: string,
      dbOptions: DataSourceOptionsExtraWithDefault
    ): Promise<DataSource> => {
      const createTypeormDataSource = (o: DataSourceOptions): DataSource => new DataSource(o)

      const [dataSourceOptions, customOptions] = splitExtraOptions(dbOptions)

      const dataSource: DataSource = await lastValueFrom(
        defer(async () => {
          if (customOptions.autoLoadEntities) {
            if (Array.isArray(dataSourceOptions.entities)) {
              dataSourceOptions.entities.push(...EntitiesStorage.getEntitiesByDataSource(dbName))
            } else {
              /**
               * FIXME
               *
               *  此处应修复 entities 为只读属性时的判断异常。在程序运行时，通常不会造成影响。
               *
               */
              // @ts-ignore
              dataSourceOptions.entities = EntitiesStorage.getEntitiesByDataSource(dbName)
            }
          }

          const d = await createTypeormDataSource(dataSourceOptions)
          // 数据库初始化。
          await d.initialize()
          return d
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
    const group: Record<string, DataSource> = {}

    const names = Object.getOwnPropertyNames(options)

    while (names.length) {
      const name = names.shift()!
      group[name] = await _createDataSource(name, options[name])
    }

    return group
  }

  public static forFeature(
    entities: EntityClassOrSchema[] = [],
    dataSourceName: string = A4_DEFAULT_DATA_SOURCE_NAME
  ): DynamicModule {
    EntitiesStorage.addEntitiesByDataSource(dataSourceName, [...entities])

    /**
     * 对每个 Entity 都设置对应的  Repository。
     */
    const providers: Array<FactoryProvider> = []

    entities.forEach((entity: EntityClassOrSchema) => {
      providers.push({
        inject: [TyprORMDataSourceGroup],
        provide: getRepositoryToken(entity, dataSourceName),
        useFactory: async (typrORMDataSourceGroup: TyprORMDataSourceGroup) => {
          const dataSource: DataSource | undefined = typrORMDataSourceGroup.options[dataSourceName]
          if (!dataSource) throw new Error(`Not found '${dataSourceName}' dataSource.`)

          const entityMetadata = dataSource.entityMetadatas.find((meta) => meta.target === entity)
          const isTreeEntity = typeof entityMetadata?.treeType !== 'undefined'
          if (isTreeEntity) return dataSource.getTreeRepository(entity)
          if (dataSource.options.type === 'mongodb') return dataSource.getMongoRepository(entity)
          return dataSource.getRepository(entity)
        },
      })

      providers.push({
        inject: [getRepositoryToken(entity, dataSourceName)],
        provide: getTypeORMCrudToken(entity, dataSourceName),
        useFactory: async (repository: Repository<IObjectLiteral>) => new A4TypeORMCrud(repository),
      })
    })

    const exportKeys: string[] = providers.map((i) => i.provide as string)

    return {
      module: A4TypeORMCrudModule,
      providers,
      exports: exportKeys,
    }
  }
}
