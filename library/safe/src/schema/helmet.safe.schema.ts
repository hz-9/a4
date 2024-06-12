/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:22:07
 */
import { IsBoolean, IsObject } from 'class-validator'
import type { HelmetOptions } from 'helmet'

import { IsOptionalNotNull } from '@hz-9/a4-core'

import { SAFE_MODULE_DEFAULT } from '../const'

/**
 *
 * @public
 *
 *  `A4 Safe` 的配置项结构。(.cors)
 *
 *  [helmet](https://helmetjs.github.io/)
 *
 */
export class A4SafeHelmetModuleSchema {
  /**
   *
   *  是否开启 `helmet`
   *
   *  作为 `ConfitSchema` 时，若缺省，则赋值为 [SAFE_MODULE_DEFAULT.HELMET.OPEN]
   *
   */
  @IsOptionalNotNull()
  @IsBoolean()
  public readonly open: boolean = SAFE_MODULE_DEFAULT.HELMET.OPEN

  /**
   *
   *  `helmet` 的配置项。
   *
   *  在 `ConfigModule` 中，仅会判断 `options` 是否为 `Object`
   *
   *  具体说明，请查看 `helmet` 的 `HelmetOptions` 接口。
   *
   *  也可进入 [helmet Reference](https://helmetjs.github.io/#reference) 查看文档。
   *
   */
  @IsOptionalNotNull()
  @IsObject()
  public readonly options?: HelmetOptions
}
