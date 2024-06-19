/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:07:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PageResDto } from '@hz-9/a4-core'

import { PermissionEntity } from '../entity/permission.entity'

export class PermissionSelectResDto extends PermissionEntity {}

export class PermissionSelectByPageResultDto {
  public readonly status: number

  public readonly data: PermissionSelectResDto[]

  public readonly page: PageResDto

  public readonly message: string
}

export class PermissionSelectNoPageResultDto {
  public readonly status: number

  public readonly data: PermissionSelectResDto[]

  public readonly message: string
}

export class PermissionSelectByIdResultDto {
  public readonly status: number

  public readonly data: PermissionSelectResDto | null

  public readonly message: string
}

export class PermissionSelectByIdsResultDto {
  public readonly status: number

  public readonly data: PermissionSelectResDto[]

  public readonly message: string
}
