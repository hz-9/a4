/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-27 14:09:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 19:24:50
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PageResDto } from '@hz-9/a4-core'
import { OmitType } from '@hz-9/a4-docs'

import { UserEntity } from '../entity/user.entity'

export class UserSelectResDto extends OmitType(UserEntity, ['password']) {}

export class UserSelectByPageResultDto {
  public readonly status: number

  public readonly data: UserSelectResDto[]

  public readonly page: PageResDto

  public readonly message: string
}

export class UserSelectNoPageResultDto {
  public readonly status: number

  public readonly data: UserSelectResDto[]

  public readonly message: string
}

export class UserSelectByIdResultDto {
  public readonly status: number

  public readonly data: UserSelectResDto | null

  public readonly message: string
}

export class UserSelectByIdsResultDto {
  public readonly status: number

  public readonly data: UserSelectResDto[]

  public readonly message: string
}

export type TokenOrCookie = string

export class UserLoginResultDto {
  public readonly status: number

  public readonly data: TokenOrCookie

  public readonly message: string
}

export class UserDetailResultDto {
  public readonly status: number

  public readonly data: UserSelectResDto

  public readonly message: string
}
