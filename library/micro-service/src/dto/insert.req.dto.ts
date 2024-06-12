/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 18:19:33
 */
import { IsNotEmptyObject } from 'class-validator'

import { IObjectLiteral } from '@hz-9/a4-core'

/**
 *
 * @public
 *
 *  跨服务间调用，`Insert` 接口参数。
 *
 */
export class InsertDtoInRpc<T extends IObjectLiteral> {
  @IsNotEmptyObject()
  public readonly data: T
}
