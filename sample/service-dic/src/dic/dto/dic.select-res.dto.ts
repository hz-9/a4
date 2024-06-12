/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 15:13:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PageResDto } from '@hz-9/a4-core'

import { DicEntity } from '../entity/dic.entity'

export class DicSelectResDto extends DicEntity {}

export class DicSelectByPageResultDto {
  public readonly status: number

  public readonly data: DicSelectResDto[]

  public readonly page: PageResDto

  public readonly message: string
}

export class DicSelectNoPageResultDto {
  public readonly status: number

  public readonly data: DicSelectResDto[]

  public readonly message: string
}

export class DicSelectByIdResultDto {
  public readonly status: number

  public readonly data: DicSelectResDto | null

  public readonly message: string
}

export class DicSelectByIdsResultDto {
  public readonly status: number

  public readonly data: DicSelectResDto[]

  public readonly message: string
}
