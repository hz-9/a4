/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:00:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PartialType } from '@hz-9/a4-docs'

import { RoleEntity } from '../entity/role.entity'

export class RoleInsertReqDto extends PartialType(RoleEntity) {}
