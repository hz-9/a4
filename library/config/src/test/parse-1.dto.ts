/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 16:39:02
 */
// tslint:disable:no-var-requires

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsObject, IsString, ValidateNested } from 'class-validator'

class A4Config {
  @IsString()
  public readonly NODE_ENV: string
}

export class AppConfigDto {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config
}
