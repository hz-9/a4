/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-26 20:01:01
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:08:38
 */
import { IsBoolean, IsNumber, IsString } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

export class AppSchema1 {
  @IsString()
  public readonly str: string

  @IsBoolean()
  public readonly isOpen: boolean

  @IsNumber()
  public readonly num: number
}

export class AppSchema2 {
  @IsString()
  public readonly str: string = 'Hello World'

  @IsBoolean()
  public readonly isOpen: boolean = true

  @IsNumber()
  public readonly num: number = 100
}

export class AppSchema3 {
  @IsOptionalNotNull()
  @IsString()
  public readonly str?: string

  @IsOptionalNotNull()
  @IsBoolean()
  public readonly isOpen?: boolean

  @IsOptionalNotNull()
  @IsNumber()
  public readonly num?: number
}
