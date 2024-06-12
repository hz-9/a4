/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-05 16:03:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 16:11:14
 */
import type { IObjectLiteral } from '../../interface'
import type { SortReqDto } from './dto'
import type { ISortOptions } from './interface'

/**
 * @public
 *
 *  `A4 Crud *` 通用工具
 *
 */
export class A4CrudUtil {
  /**
   *
   * @public
   *
   *  将 `SortReqDto` 转换为 `TypeORM` 理解的数据格式。
   *
   *  TODO 待补充单元测试。
   *
   */
  public static parseSortOptions<E extends IObjectLiteral>(value?: SortReqDto): ISortOptions<E> {
    if (!value?.sort) return {}

    const options: ISortOptions<E> = {}

    value.sort.split(/,/g).forEach((rule) => {
      if (rule.length) {
        const parts = rule.split(/[ ]+/g)
        if (parts.length === 1) {
          // @ts-ignore
          options[parts[0]] = 'DESC'
        } else {
          const firstOne = parts[0]
          parts.shift()
          // @ts-ignore
          options[firstOne] = parts.join(' ')
        }
      }
    })

    return options
  }
}
