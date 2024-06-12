/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 22:16:52
 */

/* eslint-disable max-classes-per-file */
import { IsIdorSId, IsIdorSIdArray } from '@hz-9/a4-core'

/**
 *
 * @public
 *
 *  跨服务间调用，`DeleteById` 接口参数。
 *
 */
export class DeleteByIdDtoInRpc {
  @IsIdorSId()
  public readonly id: number | string
}

/**
 *
 * @public
 *
 *  跨服务间调用，`DeleteByIds` 接口参数。
 *
 */
export class DeleteByIdsDtoInRpc {
  @IsIdorSIdArray()
  public readonly ids: number[] | string[]
}
