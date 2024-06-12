/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 20:20:32
 */
// import { ELASTICSEARCH_INDEX_PREFIX } from '../const/index'
import type { ClientOptions } from '@elastic/elasticsearch'

import { A4_DEFAULT_DATA_SOURCE_NAME } from '../const'
import type { DataSourceOptionsExtraWithDefault, IElasticSearchModuleOptions, Index } from '../interface'

/**
 * @internal
 *
 * 将
 *   DataSourceOptionsExtraWithDefault
 * 分解为
 *   ClientOptions
 *   IElasticSearchModuleOptions
 *
 * @param options - 准备拆解的配置项。
 *
 */
export const splitExtraOptions = (
  options: DataSourceOptionsExtraWithDefault
): [ClientOptions, Required<IElasticSearchModuleOptions>] => {
  const customOptions: Required<IElasticSearchModuleOptions> = {
    retryAttempts: options.retryAttempts,
    retryDelay: options.retryDelay,
    verboseRetryLog: options.verboseRetryLog,
    synchronize: options.synchronize,
  }

  const newOptions: ClientOptions = { ...options }

  /**
   * 删除属于 ITypeORMModuleOptions 的属性，防止意外传递与 TypeORM
   */
  Object.getOwnPropertyNames(customOptions).forEach((k) => {
    // @ts-ignore
    delete newOptions[k]
  })

  return [newOptions, customOptions]
}

/**
 * @public
 *
 *  根据 Index 的 Index Token。
 *
 */
export const getIndexToken = (index: Index, dbName: string): string => {
  const namePrefix = dbName === A4_DEFAULT_DATA_SOURCE_NAME ? '' : dbName

  return `A4.Crud.TypeORM.${namePrefix}${index.name}Index`
}

/**
 *
 * @public
 *
 *  根据 Entity 的 A4ElasticSearchCrud Token.
 *
 */
export const getElasticSearchCrudToken = (index: Index, dbName: string): string => {
  const r = getIndexToken(index, dbName)
  return r.replace(/Index$/, 'A4ElasticSearchCrud')
}
