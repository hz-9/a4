/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:44:35
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import httpProxy from 'http-proxy'
import { IncomingMessage, ServerResponse } from 'node:http'

import { HttpProxyUtil } from '@hz-9/a4-core'
import type { NextFunction, Request, Response } from '@hz-9/a4-core/express'
import { A4EurekaRegistry } from '@hz-9/a4-registry-eureka'

/**
 *
 * @public
 *
 *  通过 Http 协议代理请求。
 *
 */
@Injectable()
export class ProxyHttpMiddleware implements NestMiddleware {
  private _logger: Logger = new Logger('Http Proxy')

  protected readonly proxyMap: Map<string, httpProxy<IncomingMessage, ServerResponse<IncomingMessage>>> = new Map()

  public constructor(protected readonly a4EurekaRegistry: A4EurekaRegistry) {}

  public use(request: Request, response: Response, next: NextFunction): void {
    const [alias, version, url] = HttpProxyUtil.splitUrl(request.originalUrl)

    const proxy =
      this.proxyMap.get(`${alias}:${version}`) ??
      (() => {
        const p = httpProxy.createProxyServer({})
        this.proxyMap.set(`${alias}:${version}`, p)
        return p
      })()

    /**
     * 补充一些安全字段。
     */
    proxy.on('proxyRes', (proxyRes, req, res) => {
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('X-Frame-Options', 'sameorigin')
      res.setHeader('X-XSS-Protection', '1; mode=block')
      res.removeHeader('Server')
    })

    const instance = this.a4EurekaRegistry.getInstanceMetaByVId(`${alias}:${version}`)

    if (instance) {
      proxy.web(
        request,
        response,
        {
          ignorePath: true, // 忽略了 request.url 属性，直接通过 target 设置请求路径。
          target: `http://${instance.hostname}:${instance.port}/api/${url}`,
        },
        (error) => {
          /**
           * TODO 应使用更合适的 Error 对象。
           */
          next(error)
        }
      )
    } else {
      /**
       * TODO 应使用更合适的 Error 对象。
       */
      next(new Error('Not found service instance.'))
    }
  }
}
