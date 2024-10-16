/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 03:24:11
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator'

import { CU, IsOptionalNotNull } from '@hz-9/a4-core'

import { NETWORK_MODULE_DEFAULT } from '../const'

/**
 *
 * @public
 *
 *  `A4 Network` 的配置项结构。
 *
 */
export class A4NetworkModuleSchema {
  /**
   *
   * 服务是否侦听 `IPv4`。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [NETWORK_MODULE_DEFAULT.BIND_IPV4]
   *
   */
  @IsBoolean()
  public readonly bindIPv4: boolean = NETWORK_MODULE_DEFAULT.BIND_IPV4

  /**
   *
   * 服务是否侦听 `IPv6`。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [NETWORK_MODULE_DEFAULT.BIND_IPV6]
   *
   */
  @IsBoolean()
  public readonly bindIPv6: boolean = NETWORK_MODULE_DEFAULT.BIND_IPV6

  /**
   *
   * 端口自动搜索时的起始端口。
   *
   * 若该端口被占用，将会 +1 重新获取端口号。
   *
   * 系统启动时，应使用 `NetworkModule.listen` 替代 `app.listen` 以多次尝试直到获取到空闲的端口。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [NETWORK_MODULE_DEFAULT.PORT_BASELINE]
   *
   */
  @IsNumber()
  public readonly portBaseline: number = NETWORK_MODULE_DEFAULT.PORT_BASELINE

  /**
   *
   * 指定端口。此时 `portBaseline` 属性无效。
   *
   * 作为 `ConfigDto` 时，可选，默认值为 `undefined`。
   *
   * !!! 当使用 `PM2` 时，会不断重复重启、报错。慎用。
   *
   */
  @IsOptional()
  @IsNumber()
  public readonly forcePort?: number
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 用于 Multi Schema 类型判断类（A4）。
 *
 */
export class A4NetworkModuleSchemaB {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4NetworkModuleSchema)
  public readonly network: A4NetworkModuleSchema = CU.p2CwD(A4NetworkModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4NetworkModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4NetworkModuleSchemaB)
  public readonly A4: A4NetworkModuleSchemaB = CU.p2CwD(A4NetworkModuleSchemaB, {})
}
