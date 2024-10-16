/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-26 20:01:01
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:08:35
 */
import { IsObject } from 'class-validator'

import { IsOptionalNotNull } from '@hz-9/a4-core'

interface IInfo {
  name: string
  age: number
}

export class AppSchema1 {
  @IsObject()
  public readonly info: IInfo
}

export class AppSchema2 {
  @IsObject()
  public readonly info: IInfo = { name: '', age: 0 }
}

export class AppSchema3 {
  @IsOptionalNotNull()
  @IsObject()
  public readonly info?: IInfo
}
