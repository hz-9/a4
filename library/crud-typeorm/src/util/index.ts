/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:12:37
 */
import { DataSourceOptions, EntitySchema } from 'typeorm'

import { A4_DEFAULT_DATA_SOURCE_NAME } from '../const'
import type { DataSourceOptionsExtraWithDefault, EntityClassOrSchema, ITypeORMModuleOptions } from '../interface'

/**
 * @internal
 *
 * 将
 *   DataSourceOptionsExtraWithDefault
 * 分解为
 *   DataSourceOptions
 *   ITypeORMModuleOptions
 *
 * @param options - 准备拆解的配置项。
 *
 */
export const splitExtraOptions = (
  options: DataSourceOptionsExtraWithDefault
): [DataSourceOptions, Required<ITypeORMModuleOptions>] => {
  const customOptions: Required<ITypeORMModuleOptions> = {
    autoLoadEntities: options.autoLoadEntities,
    retryAttempts: options.retryAttempts,
    retryDelay: options.retryDelay,
    verboseRetryLog: options.verboseRetryLog,
  }
  const newOptions: DataSourceOptions = { ...options }

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
 *  根据 Entity 的 Repository Token.
 *
 */
export const getRepositoryToken = (entity: EntityClassOrSchema, dataSource: string): string => {
  const dataSourcePrefix = dataSource === A4_DEFAULT_DATA_SOURCE_NAME ? '' : dataSource

  if (entity instanceof EntitySchema) {
    return `${dataSourcePrefix}${entity.options.target ? entity.options.target.name : entity.options.name}Repository`
  }

  return `A4.Crud.TypeORM.${dataSourcePrefix}${entity.name}Repository`
}

/**
 * @public
 *
 *  根据 Entity 的 A4TypeORMCrud Token.
 *
 */
export const getTypeORMCrudToken = (entity: EntityClassOrSchema, dataSource: string): string => {
  const r = getRepositoryToken(entity, dataSource)
  return r.replace(/Repository$/, 'A4TypeORMCrud')
}
