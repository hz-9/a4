/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 21:20:27
 */
import { HttpStatus, Injectable, Optional } from '@nestjs/common'

import type { IObjectLiteral } from '../interface'
import { BasePipe, IBasePipeConstructorOptions } from './base.pipe'

/**
 * @public
 *
 *  用于 `CRUD` 分页查询接口的 `@Query` 装饰器中。
 *
 *  允许将多个字段转换为 int 类型。
 *
 *  默认时，视为 fields 传入 ['id']
 *
 * @example
 *
 * ``` js
 *
 *  @Query(RemovePagePipe, RemoveSortPipe, ParseMultiIntPipe, ValidationPipe) selectDicDto: SelectDicReqDto,
 *
 *  // OR
 *  @Query(
 *    RemovePagePipe,
 *    RemoveSortPipe,
 *    new ParseMultiIntPipe({ fields:  ['id', 'age']}),
 *    ValidationPipe
 *  ) selectDicDto: SelectDicReqDto,
 *
 * ```
 *
 */
export interface IParseMultiIntConstructorOptions extends IBasePipeConstructorOptions {
  /**
   * 需要进行解析为 int 的字段
   */
  fields?: string[]
}

/**
 *
 * @public
 *
 *  多字段转换为数字格式。
 *
 *  `ParseMultiNumberPipe` 与 `ParseIntPipe` 不同的是，
 *  `ParseMultiNumberPipe` 若转换失败，或待转换属性缺省，则放弃转换，不会进行抛错。会由 `ValidationPipe` 抛出异常。
 *
 *
 */
@Injectable()
export class ParseMultiNumberPipe extends BasePipe {
  protected fields: string[]

  public constructor(@Optional() options?: IParseMultiIntConstructorOptions) {
    super({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, ...options })

    this.fields = options?.fields ?? ['id']
  }

  public async transform(value: IObjectLiteral): Promise<IObjectLiteral> {
    const newValue = { ...value }

    this.fields.forEach((field) => {
      const fieldValue = newValue[field]

      if (typeof fieldValue === 'number' || typeof fieldValue === 'string') {
        newValue[field] = this._strToInt(fieldValue)
      }

      // throw this.exceptionFactory(`${field} must be a number.`)
    })

    return newValue
  }

  private _strToInt(value: string | number): number {
    const n = Number.parseFloat(value as string)
    return Number.isNaN(n) ? (value as number) : n
  }
}
