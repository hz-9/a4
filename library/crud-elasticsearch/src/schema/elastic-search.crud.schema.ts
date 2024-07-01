/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-27 18:30:54
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'

import type { DataSourceOptionsExtra } from '../interface'

/**
 *
 * @public
 *
 *  `A4 CRUD ElasticSearch Module` 配置项结构。
 *
 */
export class A4ElasticSearchCrudModuleSchema {
  @IsObject()
  public readonly default: DataSourceOptionsExtra
}

/**
 *
 * @public
 *
 *  `A4 CRUD TypeORM Module` 用于 Multi Schema 类型判断类（A4.crud）
 *
 */
export class A44ElasticSearchCrudModuleSchemaC {
  @IsObject()
  @ValidateNested()
  @Type(() => A4ElasticSearchCrudModuleSchema)
  public readonly elasticSearch: A4ElasticSearchCrudModuleSchema
}

/**
 *
 * @public
 *
 *  `A4 CRUD ElasticSearch Module` 用于 Multi Schema 类型判断类（A4）
 *
 */
export class A4ElasticSearchCrudModuleSchemaB {
  @IsObject()
  @ValidateNested()
  @Type(() => A44ElasticSearchCrudModuleSchemaC)
  public readonly crud: A44ElasticSearchCrudModuleSchemaC
}

/**
 *
 * @public
 *
 *  `A4 CRUD ElasticSearch Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4ElasticSearchCrudModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4ElasticSearchCrudModuleSchemaB)
  public readonly A4: A4ElasticSearchCrudModuleSchemaB
}
