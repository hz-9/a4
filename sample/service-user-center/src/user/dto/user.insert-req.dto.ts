/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-27 16:18:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-27 16:18:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PartialType } from '@hz-9/a4-docs'

import { UserEntity } from '../entity/user.entity'

export class UserInsertReqDto extends PartialType(UserEntity) {}
