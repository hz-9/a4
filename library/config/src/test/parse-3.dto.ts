/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 16:39:56
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsIn, IsObject, IsString, ValidateNested } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

class A4Config {
  @IsIn(['development', 'test', 'production'])
  public readonly NODE_ENV: string

  @IsOptionalNotNull()
  @IsString()
  public readonly tempDir: string = './temp'
}

export class AppConfigDto {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config
}
