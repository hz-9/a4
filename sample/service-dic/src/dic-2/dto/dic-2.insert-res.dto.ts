/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-04 16:50:52
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { Dic2Entity } from '../entity/dic-2.entity'

export class Dic2InsertResDto extends Dic2Entity {}

export class Dic2InsertResultDto {
  public readonly status: number

  public readonly data: Dic2InsertResDto

  public readonly message: string
}

export class Dic2InsertMultiResultDto {
  public readonly status: number

  public readonly data: Dic2InsertResDto[]

  public readonly message: string
}
