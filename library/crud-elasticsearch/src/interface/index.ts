/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 19:52:49
 */
import type { ClientOptions } from '@elastic/elasticsearch'

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Document = Record<string, any>

/**
 * @public
 *
 *  Index 实例对象
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Index<T extends any = any> = new (...args: Array<any>) => T

/**

/**
 * @public
 *
 *  elasticsearch 中的 `ClientOptions` 类型与 IElasticSearchModuleOptions 的联合类型（IElasticSearchModuleOptions 为全部可选参数）。
 *
 */
export type DataSourceOptionsExtra = ClientOptions & IElasticSearchModuleOptions

/**
 * @public
 *
 *   elasticsearch 中的 `ClientOptions` 类型与 IElasticSearchModuleOptions 的联合类型（IElasticSearchModuleOptions 为全部必选参数）。
 *
 */
export type DataSourceOptionsExtraWithDefault = ClientOptions & Required<IElasticSearchModuleOptions>

/**
 * @internal
 */
export type A4ElasticSearchCrudModuleOptions = Record<string, DataSourceOptionsExtraWithDefault>

/**
 * @public
 *
 *  `A4 CRUD ElasticSearch` 中，对于数据库链接的自定义参数。
 *
 *  借鉴于 `@nestjs/typeorm` 的 `TypeORMModuleOptions` 类型。
 *
 */
export interface IElasticSearchModuleOptions {
  /**
   * 重新连接次数。
   *
   * 默认: @see CRUD_ELASTICSEARCH_MODULE_DEFAULT.RETRY_ATTMPTS
   */
  retryAttempts?: number

  /**
   * 两次重连的间隔时间。（单位：ms）
   *
   * 默认: @see CRUD_ELASTICSEARCH_MODULE_DEFAULT.RETRY_DELAY
   */
  retryDelay?: number

  /**
   * 重连时，是否显示日志信息。
   *
   * 默认: @see CRUD_ELASTICSEARCH_MODULE_DEFAULT.VERBOSE_RESTRY_LOG
   */
  verboseRetryLog?: boolean

  /**
   * 是否同步 Index。
   *
   * 可选。默认值是看当前所在环境的。
   *
   *  若 isDev = true, 则默认值为 true；否则，强制为 false
   *
   */
  synchronize?: boolean
}
