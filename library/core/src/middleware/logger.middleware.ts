/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 12:19:03
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

/**
 *
 * @public
 *
 *  服务端应用程序，请求日志中间件。
 *
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private _logger: Logger = new Logger('HTTP Request')

  public use(request: Request, response: Response, next: NextFunction): void {
    const sT = Date.now()

    const { method, originalUrl, httpVersion } = request
    const userAgent = request.get('user-agent')

    /**
     *
     * TODO
     *
     *  应从多个 headers 获取请求头。
     *
     */
    const host = request.get('host')

    response.on('finish', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')

      this._logger.log(
        `${host} - "${method} ${originalUrl} HTTP/${httpVersion}" ${statusCode} ${contentLength} ${
          Date.now() - sT
        }ms "${userAgent}"`
      )
    })

    next()
  }
}
