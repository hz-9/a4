/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 20:06:06
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsBoolean, IsObject, IsString, ValidateNested } from 'class-validator'

import { ClassValidatorUtil } from '@hz-9/a4-core'

export class AppCustomConfigSchema {
  @IsBoolean()
  public initDefault: boolean = false

  /**
   *
   * 默认密码
   *
   */
  @IsString()
  public defaultPassword: string = 'A4@2024'

  /**
   *
   * Token 有效时间。{@link https://www.npmjs.com/package/ms | 格式}
   * 默认：'24h'
   *
   */
  @IsString()
  public tokenExpiresIn: string = '24h'
}

export class A4Config {
  @IsObject()
  @ValidateNested()
  @Type(() => AppCustomConfigSchema)
  public readonly app: AppCustomConfigSchema = ClassValidatorUtil.p2CwD(AppCustomConfigSchema, {})
}

export class AppConfigSchema {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config
}
