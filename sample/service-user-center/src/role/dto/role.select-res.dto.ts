/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:00:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PageResDto } from '@hz-9/a4-core'

import { RoleEntity } from '../entity/role.entity'

export class RoleSelectResDto extends RoleEntity {}

export class RoleSelectByPageResultDto {
  public readonly status: number

  public readonly data: RoleSelectResDto[]

  public readonly page: PageResDto

  public readonly message: string
}

export class RoleSelectNoPageResultDto {
  public readonly status: number

  public readonly data: RoleSelectResDto[]

  public readonly message: string
}

export class RoleSelectByIdResultDto {
  public readonly status: number

  public readonly data: RoleSelectResDto | null

  public readonly message: string
}

export class RoleSelectByIdsResultDto {
  public readonly status: number

  public readonly data: RoleSelectResDto[]

  public readonly message: string
}
