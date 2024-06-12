/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:43:03
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsEnum, IsObject, ValidateNested } from 'class-validator'

import { ProxyMode } from './enum'

export class AppCustomConfigSchema {
  @IsEnum(ProxyMode)
  public proxyMode: ProxyMode = ProxyMode.Eureka
}

export class A4Config {
  @IsObject()
  @ValidateNested()
  @Type(() => AppCustomConfigSchema)
  public readonly app: AppCustomConfigSchema
}

export class AppConfigSchema {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config
}
