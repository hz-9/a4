/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 22:25:24
 */

/**
 * @public
 *
 * A4 Crud ElasticSearch 默认数据库名称。
 *
 */
export const A4_DEFAULT_DATA_SOURCE_NAME = 'default' as const

/**
 * @public
 *
 * A4 Crud ElasticSearch 索引 Key
 *
 */
export const A4_ELASTICSEARCH_INDEX_NAME_IN_METADATA = 'A4.Crud.ElasticSearch.Metadata.IndexName' as const

/**
 * @public
 *
 *  `A4 Crud ElasticSearch` 自定义配置的默认信息。
 *
 *  各参数说明，请查看 @see IElasticSearchModuleOptions
 *
 */
export const CRUD_ELASTICSEARCH_MODULE_DEFAULT = {
  RETRY_ATTMPTS: 10,
  RETRY_DELAY: 3000,
  VERBOSE_RESTRY_LOG: true,
} as const
