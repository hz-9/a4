/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-26 20:01:01
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:08:33
 */
import { IsEnum } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

export enum Platform {
  Linux = 'Linux',
  Windows = 'Windows',
  MacOS = 'MacOS',
}

export class AppSchema1 {
  @IsEnum(Platform)
  public readonly platform: Platform
}

export class AppSchema2 {
  @IsEnum(Platform)
  public readonly platform: Platform = Platform.Linux
}

export class AppSchema3 {
  @IsOptionalNotNull()
  @IsEnum(Platform)
  public readonly platform?: Platform
}
