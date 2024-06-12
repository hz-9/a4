/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 21:34:24
 */

/**
 *
 * @public
 *
 *  分页查询中，请求返回体中分页信息结构。
 *
 */
export class PageResDto {
  /**
   *
   * 当前查询结果行数。
   *
   */
  public readonly pageSize: number

  /**
   *
   *  当前查询结果所在页数。
   *
   */
  public readonly pageNum: number

  /**
   *
   *  查询结果总共条数。
   *
   */
  public readonly total: number
}
