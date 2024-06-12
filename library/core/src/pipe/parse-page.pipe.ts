/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 12:18:38
 */
import { Injectable, PipeTransform } from '@nestjs/common'

import { PageReqDto } from '../module/crud/dto'
import type { IPageInReqData } from '../module/crud/interface'

/**
 * @public
 *
 *  解析分页查询的分页信息。
 *
 *  管道后，保证若数据为 number，则必为正整数。
 *
 */
/**
 * @public
 *
 *  用于 `CRUD` 分页查询接口的 `@Query` 装饰器中。
 *
 *  在 `params` 解析时，解析 `pageSize` `pageNum` 属性。
 *
 *  `ParsePagePipe` 将拾取 pageSize pageNum 两个属性作为 `page` 对象，并不能保证类型正常，
 *  如果传入参数异常，应由 ValidationPipe 进行抛出异常。
 *
 *  但是由于 pageSize pageNum 在通过 Query 参数传递时，是作为 string 类型的，而 ValidationPipe 是使用 Numnber 作为期待类型的。
 *  所以 ParsePagePipe 使用 `Number.parseFloat` 尝试转换，如果返回值为 NaN，则放弃转换，通过 ValidationPipe 进行抛错。
 *
 *  PS: 也许使用 `Number.parseInt` 会更符合页数、行数的概念，不过 `ParsePagePipe` 只想做属性拾取，以及因为 GET 请求方式造成的参数类型异常。
 *      实际的类型错误，应交由 ValidationPipe 进行判断。
 *
 * @example
 *
 * ``` js
 *
 *  @Query(ParsePagePipe, ValidationPipe) page: PageReqDto
 *
 * ```
 *
 */
@Injectable()
export class ParsePagePipe implements PipeTransform {
  public transform(value: IPageInReqData): Partial<PageReqDto> {
    return {
      pageSize: this._strToInt(value.pageSize),
      pageNum: this._strToInt(value.pageNum),
    }
  }

  private _strToInt(value?: string | number): number | undefined {
    const n = Number.parseFloat(value as string)
    return Number.isNaN(n) ? (value as number) : n
  }
}
