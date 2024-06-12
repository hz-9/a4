/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 20:51:28
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 18:28:17
 */
import { ArgumentsHost, HttpStatus } from '@nestjs/common'
import type { HttpAdapterHost } from '@nestjs/core'

import { IExceptionResponse, IExceptionRule, IExceptionsFilterError } from '@hz-9/a4-core'

interface IRpcException extends Error {
  message: string
  error: string[]
}

/**
 * @public
 *
 *  使 AllExceptionsFilter 支持解析 Rpc Exception 的异常解析规则。
 *
 */
export const MicroServiceExceptionRules: IExceptionRule[] = [
  [
    (exception: Error) => (exception as IRpcException).message === 'Rpc Exception',

    (exception: Error, host: ArgumentsHost, httpAdapterHost: unknown): IExceptionResponse => {
      const { httpAdapter } = httpAdapterHost as HttpAdapterHost

      const ctx = host.switchToHttp()

      return {
        instance: ctx.getResponse(),
        status: HttpStatus.BAD_REQUEST,
        body: {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: [
            `Http Error. ${ctx.getRequest().method} ${httpAdapter.getRequestUrl(ctx.getRequest())}`,
            `Name:      ${exception.message ?? exception.name}`,
            `Message:   ${((exception as IExceptionsFilterError).error ?? ['Unknown message.']).join(';')}.`,
            `Timestamp: ${new Date().toISOString()}`,
          ].join(' '),
        },
      }
    },
  ],
]
