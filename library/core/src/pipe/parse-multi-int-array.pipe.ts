/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 22:47:32
 */
import { HttpStatus, Injectable, Optional } from '@nestjs/common'

import type { IObjectLiteral } from '../interface'
import { IParseMultiIntConstructorOptions, ParseMultiNumberPipe } from './parse-multi-int.pipe'

/**
 *
 * @public
 *
 *  支持将多个字段，从字符串切割为数字的数组。
 *
 */
@Injectable()
export class ParseMultiNumberArrayPipe extends ParseMultiNumberPipe {
  public constructor(@Optional() options?: IParseMultiIntConstructorOptions) {
    super({ errorHttpStatusCode: HttpStatus.BAD_REQUEST, fields: ['ids'], ...options })
  }

  public async transform(value: IObjectLiteral): Promise<IObjectLiteral> {
    const newValue = { ...value }

    this.fields.forEach((field: string) => {
      const fieldValue = newValue[field]

      if (typeof fieldValue === 'string') {
        newValue[field] = fieldValue.split(',').map((i) => Number.parseFloat(i))
      }

      // throw this.exceptionFactory(`${field} must be a number.`)
    })

    return newValue
  }
}
