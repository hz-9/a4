/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-30 14:07:26
 */
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import type { IObjectLiteral } from '../interface'

// import type { NextFunction, Request, Response } from 'express'

/**
 *
 * TODO 根据传入的不同 metaType 返回不同的数据结构
 *
 * TODO 升级默认返回数据结构，保证正确内容；
 *
 */

interface ITransformInterceptorConstructorOptions {
  openLog?: boolean
}

/**
 * @public
 *
 *  用于返回值格式转换。
 *
 */
@Injectable()
export class TransformInterceptor<T extends IObjectLiteral = IObjectLiteral> implements NestInterceptor<T, unknown> {
  protected logger: Logger = new Logger('TransformInterceptor')

  protected httpLogger: Logger = new Logger('Http Interceptor')

  protected rpcLogger: Logger = new Logger('Rpc Interceptor')

  private _openLog: boolean

  public constructor(options: ITransformInterceptorConstructorOptions = {}) {
    this._openLog = options.openLog ?? false
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (!this._openLog) {
      return next.handle().pipe(map((data) => data))
    }

    const sT = Date.now()

    const type = context.getType()

    if (type === 'http') {
      const httpContent = context.switchToHttp()
      const request = httpContent.getRequest()
      const { method, originalUrl, httpVersion } = request
      const userAgent = request.get('user-agent')
      const host = request.get('host')
      const response = httpContent.getResponse()
      const { statusCode } = response

      return next.handle().pipe(
        map((data) => data),

        tap({
          // next: (e: any) => this.logger.log(`Next After... ${e} ${Date.now() - now}ms`),
          next: () => {
            /**
             * FIXME
             *
             *  暂未找到获取返回体长度方案。
             *
             */
            // const contentLength = response.get('content-length')
            const contentLength = '-'

            this.httpLogger.log(
              `${host} - "${method} ${originalUrl} HTTP/${httpVersion}" ${statusCode} ${contentLength} ${
                Date.now() - sT
              }ms "${userAgent}"`
            )
          },

          error: () => {
            /**
             * FIXME
             *
             *  暂未找到获取返回体长度方案。
             *
             */
            // const contentLength = response.get('content-length')
            const contentLength = '-'

            this.httpLogger.log(
              `${host} - "${method} ${originalUrl} HTTP/${httpVersion}" ${statusCode} ${contentLength} ${
                Date.now() - sT
              }ms "${userAgent}"`
            )
          },
        })
      )
    }

    if (type === 'rpc') {
      const rpcContent = context.switchToRpc()
      let key: string = ''
      const args: Record<string, unknown> = JSON.parse(rpcContent.getContext().args[0])
      Object.keys(args).forEach((k, i) => {
        key += i === 0 ? `${k}: ${args[k]}` : `, ${k}: ${args[k]}`
      })

      return next.handle().pipe(
        map((data) => data),

        tap({
          next: () => {
            this.httpLogger.log(`"${key}" OK    ${Date.now() - sT}ms`)
          },

          error: () => {
            this.httpLogger.error(`"${key}" Error ${Date.now() - sT}ms`)
          },
        })
      )
    }

    return next.handle().pipe(
      map((data) => data),

      tap({
        next: (e: unknown) => this.logger.log(`Next After... ${e} ${Date.now() - sT}ms`),
        error: (e: unknown) => this.logger.error(`Error After... ${e} ${Date.now() - sT}ms`),
      })
    )
  }
}
