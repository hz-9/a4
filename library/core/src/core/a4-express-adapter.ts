/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-23 22:35:37
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 23:24:00
 */
import * as bodyparser from 'body-parser'
import { ExpressAdapter, NestExpressBodyParserOptions, NestExpressBodyParserType } from '@nestjs/platform-express'
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util'

/**
 * @public
 *
 *  `ExpressAdapter.prototype.useBodyParser` 传入参数。
 *
 */
export interface IA4ExpressBodyParserOptions extends NestExpressBodyParserOptions {
  /**
   * 前缀。
   */
  prefix?: string
}

/**
 * @public
 *
 *  继承于 ExpressAdapter。扩展 useBodyParser 函数，保证前缀属性有效。
 *
 */
export class A4ExpressAdapter extends ExpressAdapter {
  /**
   * 完全等价于 `ExpressAdapter.prototype.useBodyParser`。
   */
  public useBodyParser<Options extends IA4ExpressBodyParserOptions = IA4ExpressBodyParserOptions>(
    type: NestExpressBodyParserType,
    rawBody: boolean,
    options?: Omit<Options, 'verify'>
  ): this {
    const prefix: string | undefined = options?.prefix as string | undefined
    const parserOptions = getBodyParserOptions<Options>(rawBody, options)
    delete parserOptions.prefix
    const parser = bodyparser[type](parserOptions)

    if (prefix === undefined) {
      this.use(parser)
    } else {
      this.use(prefix, parser)
    }

    return this
  }
}
