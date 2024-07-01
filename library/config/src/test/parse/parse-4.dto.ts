/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:09:10
 */
import { Type } from 'class-transformer'
import { IsIn, IsObject, IsString, ValidateNested } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

class PostgresConnectionOptions {
  @IsOptionalNotNull()
  @IsString()
  public readonly url?: string

  @IsString()
  public readonly host: string

  @IsString()
  public readonly port: string
}

class PostgresDatabaseGroup {
  @IsObject()
  public readonly default: PostgresConnectionOptions
}

class DBConfigDto {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => PostgresDatabaseGroup)
  public readonly postgresql?: PostgresDatabaseGroup
}

class A4Config {
  @IsIn(['development', 'test', 'production'])
  public readonly NODE_ENV: string

  @IsObject()
  @ValidateNested()
  @Type(() => DBConfigDto)
  public readonly dbTypeORM: DBConfigDto
}

export class AppConfigDto {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config
}
