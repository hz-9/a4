/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 23:27:57
 */

/* eslint-disable max-classes-per-file */
import { IsId, IsIdorSId, IsSId } from '../decorator'
import type { Debug } from './util'

/**
 *
 * @public
 *
 *  数据对象，默认接口。
 *
 */
export interface IObjectLiteral {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * @public
 *
 *  使用 id 作为索引列的数据实体。
 *
 */
export class IdEntity {
  @IsId()
  public id: number

  // 其他属性
}

/**
 * @public
 *
 *  使用 字符串 作为索引列的数据实体。
 *
 */
export class SIdEntity {
  @IsSId()
  public id: string
  // 其他属性
}

/**
 *
 * @public
 *
 *  使用 id 或 string 作为索引列的数据实体。
 *
 */
export class UnionIdEntity {
  @IsIdorSId()
  public id: string | number
  // 其他属性
}

/**
 * @public
 *
 *  IdEntity 的类型。
 *
 */
export type TIdEntity = Debug<IdEntity>

/**
 * @public
 *
 *  SIdEntity 的类型。
 *
 */
export type TSIdEntity = Debug<SIdEntity>

/**
 * @public
 *
 *  IdEntity 与 SIdEntity 的联合类型。
 *
 */
export type TUnionIdEntity = Debug<UnionIdEntity>
