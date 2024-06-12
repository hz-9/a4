/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 12:16:35
 */
import { Injectable, PipeTransform } from '@nestjs/common'

import type { IObjectLiteral } from '../interface'

/**
 * @public
 *
 *  用于 `CRUD` 分页查询接口的 `@Query` 装饰器中。
 *
 *  在 `params` 解析时，过滤 `pageSize` `pageNum` 属性。
 *
 * @example
 *
 * ``` js
 *
 *  @Query(RemovePagePipe, RemoveSortPipe, ParseMultiIntPipe, ValidationPipe) selectDicDto: SelectDicReqDto,
 *
 * ```
 *
 */
@Injectable()
export class RemovePagePipe implements PipeTransform {
  public transform(value: IObjectLiteral): IObjectLiteral {
    const obj = { ...value }

    delete obj.pageSize
    delete obj.pageNum

    return obj
  }
}
