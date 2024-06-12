/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:21:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 15:21:53
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { OmitType } from '@hz-9/a4-docs'

import { UserEntity } from '../entity/user.entity'

export class UserInsertResDto extends OmitType(UserEntity, ['password']) {}

export class UserInsertResultDto {
  public readonly status: number

  public readonly data: UserInsertResDto

  public readonly message: string
}

export class UserInsertMultiResultDto {
  public readonly status: number

  public readonly data: UserInsertResDto[]

  public readonly message: string
}
