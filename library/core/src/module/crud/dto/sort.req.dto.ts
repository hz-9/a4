/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 00:30:15
 */
import { IsOptional, IsString } from 'class-validator'

/**
 *
 * @public
 *
 *  查询中，请求参数中携带的排序信息。
 *
 */
export class SortReqDto {
  /**
   *
   * 排序规则。
   *
   * 可选。默认为 undefined。
   *
   */
  @IsOptional()
  @IsString()
  public sort?: string
}
