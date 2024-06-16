/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 22:52:02
 */
import { CACHE_TTL_METADATA, CacheInterceptor as CacheInterceptorBase } from '@nestjs/cache-manager'
import { CallHandler, ExecutionContext, Injectable, Logger, StreamableFile } from '@nestjs/common'
import { isFunction, isNil } from '@nestjs/common/utils/shared.utils'
import { Observable, of, tap } from 'rxjs'

import type { Response } from '@hz-9/a4-core/express'

/**
 * @public
 *
 *  Cache 安装于 Controller 的装饰器。
 *
 */
@Injectable()
export class CacheInterceptor extends CacheInterceptorBase {
  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const key = this.trackBy(context)
    const ttlValueOrFactory =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ??
      this.reflector.get(CACHE_TTL_METADATA, context.getClass()) ??
      null

    if (!key) {
      return next.handle()
    }
    try {
      const value = await this.cacheManager.get(key)
      if (!isNil(value)) {
        this.addCacheHeader(context)
        return of(value)
      }
      const ttl = isFunction(ttlValueOrFactory) ? await ttlValueOrFactory(context) : ttlValueOrFactory

      return next.handle().pipe(
        tap(async (response) => {
          if (response instanceof StreamableFile) {
            return
          }

          const args = [key, response]
          if (!isNil(ttl)) {
            // this.cacheManagerIsv5OrGreater 肯定是 true
            /**
             * FIXME
             *
             * this.cacheManagerIsv5OrGreater 来判断 第三个参数格式不正确。
             *
             * @hz-9/a4-cache 应用的 cache-manager 永远处于 5.0.0 版本以上，仍需要 { ttl } 传入 ttl 信息。
             *
             */
            // args.push(this.cacheManagerIsv5OrGreater ? ttl : { ttl })
            args.push({ ttl })
          }

          try {
            await this.cacheManager.set(...args)
          } catch (err: unknown) {
            Logger.error(
              `An error has occurred when inserting "key: ${key}", "value: ${response}"`,
              (err as Error).stack,
              'CacheInterceptor'
            )
          }
        })
      )
    } catch {
      return next.handle()
    }
  }

  protected addCacheHeader(context: ExecutionContext): void {
    const res: Response = context.switchToHttp().getResponse()
    res.setHeader('X-A4-Cache-Hit', 'true')
  }
}
