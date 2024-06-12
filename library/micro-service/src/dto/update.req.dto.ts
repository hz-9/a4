/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 22:19:11
 */

/* eslint-disable max-classes-per-file */
import { IsNotEmptyObject } from 'class-validator'

import { IObjectLiteral, IsIdorSId, IsIdorSIdArray } from '@hz-9/a4-core'

/**
 *
 * @public
 *
 *  跨服务间调用，`UpdateById` 接口参数。
 *
 */
export class UpdateByIdDtoInRpc<T extends IObjectLiteral> {
  @IsIdorSId()
  public readonly id: number | string

  @IsNotEmptyObject()
  public readonly data: Omit<T, 'id'>
}

/**
 *
 * @public
 *
 *  跨服务间调用，`UpdateByIds` 接口参数。
 *
 */
export class UpdateByIdsDtoInRpc<T extends IObjectLiteral> {
  @IsIdorSIdArray()
  public readonly ids: number[] | string[]

  @IsNotEmptyObject()
  public readonly data: Omit<T, 'id'>
}
