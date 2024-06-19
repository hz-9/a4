/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:07:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PermissionEntity } from '../entity/permission.entity'

export class PermissionInsertResDto extends PermissionEntity {}

export class PermissionInsertResultDto {
  public readonly status: number

  public readonly data: PermissionInsertResDto

  public readonly message: string
}

export class PermissionInsertMultiResultDto {
  public readonly status: number

  public readonly data: PermissionInsertResDto[]

  public readonly message: string
}
