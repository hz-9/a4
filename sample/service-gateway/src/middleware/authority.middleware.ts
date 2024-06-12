/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 16:21:32
 */
import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import JWT from 'jsonwebtoken'

import type { NextFunction, Request, Response } from '@hz-9/a4-core/express'

/**
 *
 * @public
 *
 *  服务端应用程序，请求日志中间件。
 *
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private _logger: Logger = new Logger('Auth')

  public inWhiteList(path: string): boolean {
    const list: string[] = ['user/login']
    return list.includes(path)
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    const token: string | undefined = typeof request.headers.token === 'string' ? request.headers.token : undefined
    let hasAuth: boolean = false
    try {
      if (token !== undefined) {
        // 进行 Token 验证。
        const payload = JWT.verify(token, '') as JWT.JwtPayload
        hasAuth = true

        if (typeof payload === 'object') {
          Object.keys(payload).forEach((k) => {
            request.headers[`gateway-${k}`] = payload[k]
          })
        }
      }

      if (this.inWhiteList(request.path)) {
        //
      } else if (!hasAuth) {
        // Http 异常状态！！！
        throw new UnauthorizedException()
      } else {
        next()
      }
    } catch (error) {
      // ...
    }

    next()
  }
}
