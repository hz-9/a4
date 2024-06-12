/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 12:18:43
 */
import { Injectable, PipeTransform } from '@nestjs/common'

import type { SortReqDto } from '../module/crud/dto'
import type { ISortInReqData } from '../module/crud/interface'

/**
 * @public
 *
 *  用于 `CRUD` 分页查询接口的 `@Query` 装饰器中。
 *
 *  在 `params` 解析时，解析 `sort` 属性。
 *
 * @example
 *
 * ``` js
 *
 *  @Query(ParseSortPipe, ValidationPipe) sort: SortReqDto
 *
 * ```
 *
 */
@Injectable()
export class ParseSortPipe implements PipeTransform {
  public transform(value: ISortInReqData): SortReqDto {
    return {
      sort: value.sort,
    }
  }
}
