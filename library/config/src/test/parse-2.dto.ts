/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 16:39:24
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsObject, IsString, ValidateNested } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

class A4Config {
  @IsOptionalNotNull()
  @IsString()
  public readonly NODE_ENV: string = 'development'
}

export class AppConfigDto {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config
}
