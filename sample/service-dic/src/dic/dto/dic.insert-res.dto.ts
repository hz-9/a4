/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 15:13:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { DicEntity } from '../entity/dic.entity'

export class DicInsertResDto extends DicEntity {}

export class DicInsertResultDto {
  public readonly status: number

  public readonly data: DicInsertResDto

  public readonly message: string
}

export class DicInsertMultiResultDto {
  public readonly status: number

  public readonly data: DicInsertResDto[]

  public readonly message: string
}
