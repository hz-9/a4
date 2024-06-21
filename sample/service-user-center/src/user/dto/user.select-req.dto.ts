/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-27 16:18:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 19:52:41
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PartialType, PickType } from '@hz-9/a4-docs'

import { UserEntity } from '../entity/user.entity'

export class UserSelectReqDto extends PartialType(UserEntity) {}

export class UserLoginReqDto extends PickType(UserEntity, ['username', 'password']) {}
