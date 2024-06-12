/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:17:41
 */
import type { CorsOptions as CORSOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { IsBoolean, IsObject } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

import { SAFE_MODULE_DEFAULT } from '../const'

/**
 *
 * @public
 *
 *  `A4 Safe` 的配置项结构。(.cors)
 *
 */
export class A4SafeCORSModuleSchema {
  /**
   *
   *  是否开启 `CORS`。
   *
   *  作为 `ConfitSchema` 时，若缺省，则赋值为 [SAFE_MODULE_DEFAULT.CORS.OPEN]
   *
   */
  @IsOptionalNotNull()
  @IsBoolean()
  public readonly open: boolean = SAFE_MODULE_DEFAULT.CORS.OPEN

  /**
   *
   *  `CORS` 的配置项。
   *
   *  在 `ConfigModule` 中，仅会判断 `options` 是否为 `Object`
   *
   *  具体说明，请查看 `@nestjs/common` 的 `CorsOptions` 接口。
   *
   */
  @IsOptionalNotNull()
  @IsObject()
  public readonly options?: CORSOptions
}
