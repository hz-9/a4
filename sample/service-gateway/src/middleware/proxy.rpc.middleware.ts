/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 02:05:37
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { timeout } from 'rxjs/operators'

import type { NextFunction, Request, Response } from '@hz-9/a4-core/express'
import { A4MicroService, MicroServiceClient } from '@hz-9/a4-micro-service'

/**
 *
 * @public
 *
 *  通过 RPC 协议代理请求。
 *
 */
@Injectable()
export class ProxyRpcMiddleware implements NestMiddleware {
  protected readonly logger: Logger = new Logger('RPC Proxy')

  protected readonly client: MicroServiceClient | undefined

  public constructor(protected readonly a4MicroService: A4MicroService) {
    this.client = this.a4MicroService.client
  }

  public async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      if (!this.client) throw new Error()

      /**
       * TODO
       *
       *  1. 此方案，仅适应与json 格式，stream 文件传输存在问题。
       *
       */
      const result = await firstValueFrom(
        this.client.send({ cmd: request.query.cmd }, request.body).pipe(timeout(5000))
      )

      response.send(result)
    } catch (error) {
      next(error)
    }
  }

  protected proxyByNull(request: Request, response: Response, next: NextFunction): void {
    next(new Error('No Proxy.'))
  }
}
