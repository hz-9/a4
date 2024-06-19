/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:00:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { RoleEntity } from '../entity/role.entity'

export class RoleInsertResDto extends RoleEntity {}

export class RoleInsertResultDto {
  public readonly status: number

  public readonly data: RoleInsertResDto

  public readonly message: string
}

export class RoleInsertMultiResultDto {
  public readonly status: number

  public readonly data: RoleInsertResDto[]

  public readonly message: string
}
