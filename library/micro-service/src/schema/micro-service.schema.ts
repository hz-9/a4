/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:08:43
 */

/* eslint-disable max-classes-per-file */
import { RedisOptions } from '@nestjs/microservices'
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

/**
 *
 * @public
 *
 *  `A4 Micro Service Module` 的配置项结构。(.connect)
 *
 */
export class A4MicroServiceConnectModuleSchema {
  /**
   *
   * `Redis Connected` 相关配置。
   *
   *  在 `ConfigSchema` 中，仅会判断 `redis` 是否为 `Object`。
   *  `A4` 不会进行更详细的参数说明。
   *
   */
  @IsOptionalNotNull()
  @IsObject()
  public readonly redis?: RedisOptions['options']
}

/**
 *
 * @public
 *
 *  `A4 Micro Service Module` 的配置项结构。
 *
 */
export class A4MicroServiceModuleSchema {
  /**
   *
   * `Connect` 相关配置。
   *
   */
  @IsObject()
  @ValidateNested()
  @Type(() => A4MicroServiceConnectModuleSchema)
  public readonly connect: A4MicroServiceConnectModuleSchema
}

/**
 *
 * @public
 *
 *  `A4 Micro Service Module` 用于 Multi Schema 类型判断类（A4）。
 *
 */
export class A4MicroServiceModuleSchemaB {
  @IsObject()
  @ValidateNested()
  @Type(() => A4MicroServiceModuleSchema)
  public readonly microService: A4MicroServiceModuleSchema
}

/**
 *
 * @public
 *
 *  `A4 Micro Service Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4MicroServiceModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4MicroServiceModuleSchemaB)
  public readonly A4: A4MicroServiceModuleSchemaB
}
