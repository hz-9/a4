/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 21:33:02
 */
import { IsInt, Max, Min } from 'class-validator'

/**
 *
 * @public
 *
 *  分页查询中，请求参数中携带的分页信息。
 *
 */
export class PageReqDto {
  /**
   *
   * 页码。
   *
   * 可选。默认为 1。
   *
   */
  @IsInt()
  @Min(1)
  public pageNum: number = 1

  /**
   *
   * 行数。
   *
   * 可选。默认为 20。
   *
   */
  @IsInt()
  @Max(1000)
  @Min(1)
  public pageSize: number = 20
}
