/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:31:53
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'

import { ClassValidatorUtil as CU, IsOptionalNotNull } from '@hz-9/a4-core'

import { A4SafeCORSModuleSchema } from './cors.safe.schema'
import { A4SafeHelmetModuleSchema } from './helmet.safe.schema'

/**
 *
 * @public
 *
 *  `A4 Safe Module` 的配置项结构。
 *
 */
export class A4SafeModuleSchema {
  /**
   *
   * `CORS` 相关配置。
   *
   */
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4SafeCORSModuleSchema)
  public readonly cors: A4SafeCORSModuleSchema = CU.p2CwD(A4SafeCORSModuleSchema, {})

  /**
   *
   * `Helmet` 相关配置。
   *
   */
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4SafeHelmetModuleSchema)
  public readonly helmet: A4SafeHelmetModuleSchema = CU.p2CwD(A4SafeHelmetModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 用于 Multi Schema 类型判断类（A4）。
 *
 */
export class A4SafeModuleSchemaB {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4SafeModuleSchema)
  public readonly safe: A4SafeModuleSchema = CU.p2CwD(A4SafeModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4SafeModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4SafeModuleSchemaB)
  public readonly A4: A4SafeModuleSchemaB
}
