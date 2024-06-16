/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-12 00:04:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-16 00:11:47
 */

/* eslint-disable @typescript-eslint/no-explicit-any, max-classes-per-file */
import { IsId, IsIdArray, IsSId, IsSIdArray } from '../../../decorator'

/**
 * @public
 *
 *  Controller 进行 PATCH DELETE 请求时，`@Param` 解析的数据结构。
 *
 *  `{ id: number }`
 *
 */
export class ParamIdReqDto {
  @IsId()
  public readonly id: number
}

/**
 * @public
 *
 *  Controller 进行 PATCH DELETE 请求时，`@Param` 解析的数据结构。
 *
 *  `{ id: string }`
 *
 */
export class ParamSIdReqDto {
  @IsSId()
  public readonly id: string
}

/**
 * @public
 *
 *  Controller 进行 PATCH DELETE 请求时，`@Param` 解析的数据结构。
 *
 *  `{ id: any }`
 *
 */
export class ParamAnyIdReqDto {
  public readonly id: any
}

/**
 * @public
 *
 *  Controller 进行 PATCH DELETE 请求时，`@Param` 解析的数据结构。
 *
 *  `{ ids: number[] }`
 *
 */
export class ParamIdsReqDto {
  @IsIdArray()
  public readonly ids: number[]
}

/**
 * @public
 *
 *  Controller 进行 PATCH DELETE 请求时，`@Param` 解析的数据结构。
 *
 *  `{ ids: string[] }`
 *
 */
export class ParamSIdsReqDto {
  @IsSIdArray()
  public readonly ids: string[]
}

/**
 * @public
 *
 *  Controller 进行 PATCH DELETE 请求时，`@Param` 解析的数据结构。
 *
 *  `{ ids: any[] }`
 *
 */
export class ParamAnyIdsReqDto {
  public readonly ids: any[]
}
