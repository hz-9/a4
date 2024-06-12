/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 10:56:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 16:52:28
 * @Description  : `A4 CRUD` 的接口。
 */
import type { IObjectLiteral } from '../../../interface/entity'
import type { PageReqDto, PageResDto } from '../dto/index'

/**
 * @public
 *
 *  默认数据类型，包含分页信息
 *
 */
export interface IPageInReqData extends IObjectLiteral {
  pageNum?: string
  pageSize?: string
}

/**
 * @public
 *
 *  默认数据类型，包含排序信息
 *
 */
export interface ISortInReqData extends IObjectLiteral {
  sort?: string
}

/**
 * @public
 *
 * 复制于 typeorm 的 FindOptionsOrderValue 类型
 *
 */
// export type IFindOptionsOrderValue =
//   | 'ASC'
//   | 'DESC'
//   | 'asc'
//   | 'desc'
//   | 1
//   | -1
//   | {
//       direction?: 'asc' | 'desc' | 'ASC' | 'DESC'
//       nulls?: 'first' | 'last' | 'FIRST' | 'LAST'
//     }

/**
 *
 * @public
 *
 *  A4 通用的排序数据接口。
 *
 *  目前仅支持 基础字段的排序操作。
 *
 *  `ASC` | `asc` | 1    代表该字段升序。
 *
 *  `DESC` | `desc` | -1 代表该字段升序。
 *
 */
export type ISortOptions<T extends IObjectLiteral> = {
  [P in keyof T]?: 'ASC' | 'DESC' | 'asc' | 'desc' | '1' | '-1'
}

/**
 * @public
 *
 *  更新后，返回结果。
 *
 */
export interface IUpdateResult {
  /**
   * 影响行数。
   */
  affected?: number | null
}

/**
 * @public
 *
 *  删除后，返回结果。
 *
 */
export interface IDeleteResult {
  /**
   * 影响行数。
   */
  affected?: number | null
}

/**
 * @public
 *
 *  selectByPage `Service` 层，传入参数接口。
 *
 */
export interface ISelectByPageOptions<T extends IObjectLiteral> extends ISelectNoPageOptions<T> {
  page: PageReqDto
}

/**
 * @public
 *
 *  selectNoPage `Service` 层，传入参数接口。
 *
 */
export interface ISelectNoPageOptions<T extends IObjectLiteral> {
  sort: ISortOptions<T>
}

/**
 * @public
 *
 *  selectByPage `Service` 层，传入参数接口。
 *
 */
export interface ISelectByPageReturn<T extends IObjectLiteral> extends ISelectNoPageReturn<T> {
  page: PageResDto
}

/**
 * @public
 *
 *  selectNoPage `Service` 层，传入参数接口。
 *
 */
export interface ISelectNoPageReturn<T extends IObjectLiteral> {
  data: T[]
}

/**
 *
 * @public
 *
 *  `A4 CRUD Module` 抽象类。
 *
 */
export abstract class IA4CrudModule {}
