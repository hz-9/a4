/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 10:06:40
 */
import type { DataSourceOptions, EntitySchema } from 'typeorm'

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type EntityClassOrSchema = Function | EntitySchema

/**
 * @public
 *
 *  typeorm 中的 `DataSourceOptions` 类型与 ITypeORMModuleOptions 的联合类型（ITypeORMModuleOptions 为全部可选参数）。
 *
 */
export type DataSourceOptionsExtra = DataSourceOptions & ITypeORMModuleOptions

/**
 * @public
 *
 *  typeorm 中的 `DataSourceOptions` 类型与 ITypeORMModuleOptions 的联合类型（ITypeORMModuleOptions 为全部必选参数）。
 *
 */
export type DataSourceOptionsExtraWithDefault = DataSourceOptions & Required<ITypeORMModuleOptions>

/**
 * @internal
 */
export type A4TypeORMCrudModuleOptions = Record<string, DataSourceOptionsExtraWithDefault>

/**
 * @public
 *
 *  `A4 CRUD TypeORM` 中，对于数据库链接的自定义参数。
 *
 *  借鉴于 `nestjs-typeorm` 的 `TypeORMModuleOptions` 类型。
 *
 */
export interface ITypeORMModuleOptions {
  /**
   * 是否自动加载 Entities。
   *
   * 默认：
   * @see CRUD_TYPEORM_MODULE_DEFAULT.AUTO_LOAD_ENTITIES
   */
  autoLoadEntities?: boolean

  /**
   * 重新连接次数。
   *
   * 默认:
   * @see CRUD_TYPEORM_MODULE_DEFAULT.RETRY_ATTMPTS
   */
  retryAttempts?: number

  /**
   * 两次重连的间隔时间。（单位：ms）
   *
   * 默认:
   * @see CRUD_TYPEORM_MODULE_DEFAULT.RETRY_DELAY
   */
  retryDelay?: number

  /**
   * 重连时，是否显示日志信息。
   *
   * 默认:
   * @see CRUD_TYPEORM_MODULE_DEFAULT.VERBOSE_RESTRY_LOG
   */
  verboseRetryLog?: boolean
}
