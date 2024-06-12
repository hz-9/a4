/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 16:40:15
 */
import type { Cache, Milliseconds, WrapTTL } from 'cache-manager'
import { type Observable, from, lastValueFrom } from 'rxjs'

/**
 * @public
 *
 *  Cache.prototype.wrap 是基于 Promise 进行实现的。
 *
 *  对在使用 Rxjs 时，提供语法糖。
 *
 */
export const cacheWrapToObservable = <T>(
  cache: Cache,
  key: string,
  fun: () => Observable<T>,
  ttl?: WrapTTL<T>,
  refreshThreshold?: Milliseconds
): Observable<T> => {
  const c = cache.wrap(
    key,
    async () => {
      const r = await lastValueFrom(fun())
      return r
    },
    ttl,
    refreshThreshold
  )
  return from(c)
}

/**
 * @public
 *
 *  Cache.prototype.wrap 是基于 Promise 进行实现的。
 *
 *  对在使用 Rxjs 时，提供语法糖。
 *
 */
export const cacheWrapToObservable2 = <T>(
  cache: Cache,
  key: string,
  fun: () => Promise<T>,
  ttl?: WrapTTL<T>,
  refreshThreshold?: Milliseconds
): Observable<T> => {
  const c = cache.wrap(key, fun, ttl, refreshThreshold)
  return from(c)
}
