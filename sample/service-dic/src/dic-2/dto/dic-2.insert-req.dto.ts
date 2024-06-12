/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-04 16:50:33
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PartialType } from '@hz-9/a4-docs'

import { Dic2Entity } from '../entity/dic-2.entity'

export class Dic2InsertReqDto extends PartialType(Dic2Entity) {}
