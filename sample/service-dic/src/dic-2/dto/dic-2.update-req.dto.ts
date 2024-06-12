/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-04 16:51:24
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { OmitType, PartialType } from '@hz-9/a4-docs'

import { Dic2Entity } from '../entity/dic-2.entity'

export class Dic2UpdateReqDto extends PartialType(OmitType(Dic2Entity, ['id'])) {}
