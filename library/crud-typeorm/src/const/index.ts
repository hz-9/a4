/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 18:08:22
 */

/**
 * @public
 *
 * A4 Crud TypeORM 默认数据库名称。
 *
 */
export const A4_DEFAULT_DATA_SOURCE_NAME = 'default' as const

/**
 * @public
 *
 *  `A4 Crud TypeORM` 自定义配置的默认信息。
 *
 *  各参数说明，请查看 @see ITypeORMModuleOptions
 *
 */
export const CRUD_TYPEORM_MODULE_DEFAULT = {
  AUTO_LOAD_ENTITIES: true,
  RETRY_ATTMPTS: 10,
  RETRY_DELAY: 3000,
  VERBOSE_RESTRY_LOG: true,
} as const
