/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:27:05
 */
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'
import { defer, lastValueFrom } from 'rxjs'
import { DataSource, type DataSourceOptions, type Repository } from 'typeorm'

import { A4ModuleBase, A4Util, IA4Config, IA4CrudModule, IObjectLiteral, RunEnv } from '@hz-9/a4-core'

import {
  A4_CRUD_TYPEORM_DATASOURCE_GROUP,
  A4_CRUD_TYPEORM_OPTIONS,
  A4_DEFAULT_DATA_SOURCE_NAME,
  CRUD_TYPEORM_MODULE_DEFAULT,
} from '../const'
import { DataSourceOptionsExtra, DataSourceOptionsExtraWithDefault, EntityClassOrSchema } from '../interface'
import { A4TypeORMCrudModuleSchemaA } from '../schema'
import { getRepositoryToken, getTypeORMCrudToken, splitExtraOptions } from '../util'
import { EntitiesStorage } from './entities.storage'
import { A4TypeORMCrud } from './typeorm.crud'

/**
 * @public
 *
 *  `A4 CRUD TypeORM` 核心模块类。
 *
 */
@Module({})
export class A4TypeORMCrudModule implements A4ModuleBase, IA4CrudModule {
  public static logger: Logger = new Logger('A4 Crud')

  /* eslint-disable @typescript-eslint/typedef */
  public static CONFIG_MIDDLE_PATH = 'A4.crud.typeORM' as const

  public static Schema = A4TypeORMCrudModuleSchemaA
  /* eslint-enable @typescript-eslint/typedef */

  public static forRootAsync(
    options: Omit<FactoryProvider<Record<string, DataSourceOptionsExtraWithDefault>>, 'provide'>
  ): DynamicModule {
    return {
      module: A4TypeORMCrudModule,

      providers: [
        {
          provide: A4_CRUD_TYPEORM_OPTIONS,
          inject: options.inject,
          useFactory: async (...args) => {
            const result = await options.useFactory(...args)
            return result
          },
        },

        {
          provide: A4_CRUD_TYPEORM_DATASOURCE_GROUP,
          inject: [A4_CRUD_TYPEORM_OPTIONS],
          useFactory: async (dataSourceOptions: Record<string, DataSourceOptionsExtraWithDefault>) => {
            const group: Record<string, DataSource> = {}

            const names = Object.getOwnPropertyNames(dataSourceOptions)

            while (names.length) {
              const name = names.shift()!
              group[name] = await this._createDataSource(name, dataSourceOptions[name])
            }

            return group
          },
        },
      ],

      exports: [A4_CRUD_TYPEORM_OPTIONS, A4_CRUD_TYPEORM_DATASOURCE_GROUP],

      global: true,
    }
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
        inject: [A4_CRUD_TYPEORM_DATASOURCE_GROUP],
        provide: getRepositoryToken(entity, dataSourceName),
        useFactory: async (dataSourceGroup: Record<string, DataSource>) => {
          const dataSource: DataSource | undefined = dataSourceGroup[dataSourceName]
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

  private static async _createDataSource(
    dbName: string,
    options: DataSourceOptionsExtraWithDefault
  ): Promise<DataSource> {
    const createTypeormDataSource = (o: DataSourceOptions): DataSource => new DataSource(o)

    const [dataSourceOptions, customOptions] = splitExtraOptions(options)

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
        A4Util.handleRetry(dbName, options.retryDelay, options.retryAttempts, options.verboseRetryLog, this.logger)
      )
    )

    return dataSource
  }

  public static getConfig(a4Config: IA4Config): Record<string, DataSourceOptionsExtraWithDefault> {
    const config = a4Config.getOrThrow<Record<string, DataSourceOptionsExtra>>(this.CONFIG_MIDDLE_PATH)

    const newConfig: Record<string, DataSourceOptionsExtraWithDefault> = {}

    const names = Object.getOwnPropertyNames(config)

    while (names.length) {
      const name = names.shift()!
      const c = config[name]

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
}
