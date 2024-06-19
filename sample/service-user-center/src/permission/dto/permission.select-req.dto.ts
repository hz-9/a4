/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:07:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PartialType } from '@hz-9/a4-docs'

import { PermissionEntity } from '../entity/permission.entity'

export class PermissionSelectReqDto extends PartialType(PermissionEntity) {}
