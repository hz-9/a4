/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:15:35
 */

/* eslint-disable max-classes-per-file */
import type { EurekaClient } from '@rocketsoftware/eureka-js-client'
import { Type } from 'class-transformer'
import { IsObject, IsString, ValidateNested } from 'class-validator'

import { ClassValidatorUtil as CU, IsOptionalNotNull } from '@hz-9/a4-core'

/**
 *
 * @public
 *
 *  `A4 Registry Eureka Module` 的配置项结构。(.instance)
 *
 */
export class A4EurekaRegistryInstanceModuleSchema {
  /**
   *
   *  注册到 Eureka 时的 instance 属性。
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly instanceId?: string

  /**
   *
   *  应用名称。
   *
   *  作为 `ConfitSchema` 时，服务在注重中心的名称。
   *
   */
  @IsString()
  public readonly service: string

  /**
   *
   *  应用名称。
   *
   *  作为 `ConfitSchema` 时，服务在 URL 的名称。
   *
   */
  @IsString()
  public readonly urlAlias: string

  /**
   *
   *  应用名称。
   *
   *  作为 `ConfitSchema` 时，服务在注重中心的版本。通常为 `v1` 格式。
   *
   */
  @IsString()
  public readonly version: string

  /**
   *
   *  其他需要录入到 metadata 的信息。
   *
   */
  @IsOptionalNotNull()
  @IsObject()
  public readonly metadata?: object
}

/**
 *
 * @public
 *
 *  `A4 Registry Eureka Module` 的配置项结构。
 *
 */
export class A4EurekaRegistryModuleSchema {
  /**
   *
   * `Eureka` 服务端相关配置。
   *
   *  在 `ConfigSchema` 中，仅会判断 `service` 是否为 `Object`
   *
   *  [EurekaClient.EurekaClientConfig](TODO)
   *
   */
  @IsObject()
  public readonly service: EurekaClient.EurekaClientConfig

  /**
   *
   * 服务在 `Eureka` 注册时的实例信息。
   *
   */
  @IsObject()
  @ValidateNested()
  @Type(() => A4EurekaRegistryInstanceModuleSchema)
  public readonly instance: A4EurekaRegistryInstanceModuleSchema
}

/**
 *
 * @public
 *
 *  `A4 Registry Eureka Module` 用于 Multi Schema 类型判断类（A4）。
 *
 */
export class A4EurekaRegistryModuleSchemaB {
  @IsObject()
  @ValidateNested()
  @Type(() => A4EurekaRegistryModuleSchema)
  public readonly registry: A4EurekaRegistryModuleSchema
}

/**
 *
 * @public
 *
 *  `A4 Registry Eureka Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4EurekaRegistryModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4EurekaRegistryModuleSchemaB)
  public readonly A4: A4EurekaRegistryModuleSchemaB
}
