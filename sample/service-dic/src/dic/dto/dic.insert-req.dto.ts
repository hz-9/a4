/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 15:13:00
 */

/* eslint-disable max-classes-per-file, @rushstack/no-new-null */
import { PartialType } from '@hz-9/a4-docs'

import { DicEntity } from '../entity/dic.entity'

export class DicInsertReqDto extends PartialType(DicEntity) {}
