/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 21:52:45
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PageResDto } from '@hz-9/a4-core'

import { Dic2Entity } from '../entity/dic-2.entity'

export class Dic2SelectResDto extends Dic2Entity {}

export class Dic2SelectByPageResultDto {
  public readonly status: number

  public readonly data: Dic2SelectResDto[]

  public readonly page: PageResDto

  public readonly message: string
}

export class Dic2SelectNoPageResultDto {
  public readonly status: number

  public readonly data: object[]

  public readonly message: string
}

export class Dic2SelectByIdResultDto {
  public readonly status: number

  public readonly data: Dic2SelectResDto | null

  public readonly message: string
}

export class Dic2SelectByIdsResultDto {
  public readonly status: number

  public readonly data: Dic2SelectResDto[]

  public readonly message: string
}
