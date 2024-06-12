/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 16:40:56
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsObject, ValidateNested } from 'class-validator'

import { ClassValidatorUtil as CU, IsOptionalNotNull } from '@hz-9/a4-core'

class NetworkHostConfigDto {
  @IsOptionalNotNull()
  @IsBoolean()
  public readonly bindIpv4: boolean = true

  @IsOptionalNotNull()
  @IsBoolean()
  public readonly bindIpv6: boolean = false
}

class NetworkPortConfigDto {
  @IsOptionalNotNull()
  @IsNumber()
  public readonly baseline: number = 16100

  @IsOptionalNotNull()
  @IsNumber()
  public readonly forcePort?: number
}

export class NetworkConfigDto {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => NetworkHostConfigDto)
  public readonly host: NetworkHostConfigDto = CU.p2CwD(NetworkHostConfigDto, {})

  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => NetworkPortConfigDto)
  public readonly port: NetworkPortConfigDto = CU.p2CwD(NetworkPortConfigDto, {})
}

export class A4Config {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => NetworkConfigDto)
  public readonly network: NetworkConfigDto = CU.p2CwD(NetworkConfigDto, {})
}

export class AppConfigDto {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config
}
