/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 15:44:37
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'

import type { DataSourceOptionsExtra } from '../interface'

/**
 *
 * @public
 *
 *  `A4 CRUD TypeORM Module` 配置项结构。
 *
 */
export class A4TypeORMCrudModuleSchema {
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
export class A4TypeORMCrudModuleSchemaC {
  @IsObject()
  @ValidateNested()
  @Type(() => A4TypeORMCrudModuleSchema)
  public readonly typeORM: A4TypeORMCrudModuleSchema
}

/**
 *
 * @public
 *
 *  `A4 CRUD TypeORM Module` 用于 Multi Schema 类型判断类（A4）
 *
 */
export class A4TypeORMCrudModuleSchemaB {
  @IsObject()
  @ValidateNested()
  @Type(() => A4TypeORMCrudModuleSchemaC)
  public readonly crud: A4TypeORMCrudModuleSchemaC
}

/**
 *
 * @public
 *
 *  `A4 CRUD TypeORM Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4TypeORMCrudModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4TypeORMCrudModuleSchemaB)
  public readonly A4: A4TypeORMCrudModuleSchemaB
}
