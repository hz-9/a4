/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 18:11:37
 */

/**
 * @public
 *
 * 用于作为 A4 Crud TypeORM 配置的标记。
 *
 */
export const A4_CRUD_TYPEORM_OPTIONS = 'A4.Crud.TypeORM.Option' as const

/**
 * @public
 *
 *  用于作为 A4 Crud TypeORM 多数据库合集的标记
 *
 */
export const A4_CRUD_TYPEORM_DATASOURCE_GROUP = 'A4.Crud.TypeORM.DataSourceGroup' as const

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
