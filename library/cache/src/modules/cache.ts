import * as cacheManager from 'cache-manager'
import { type A4Application, type IA4Cache } from '@hz-9/a4-core'
import { Logger } from '@nestjs/common'

import { ICacheConstructorOptions, ICacheMemoryInfo, ICacheRedisInfo } from '../interface'

/**
 * @public
 */
export class A4Cache implements IA4Cache {
  protected readonly logger: Logger = new Logger('A4 Docs')

  protected readonly options: ICacheConstructorOptions

  protected cache: cacheManager.Cache | cacheManager.MultiCache

  public constructor(options: ICacheConstructorOptions) {
    this.options = options
  }

  /**
   *
   * @public
   *
   *  初始化
   *
   */
  public async init(app: A4Application): Promise<void> {
    const createCacheFactory = async (options: ICacheMemoryInfo | ICacheRedisInfo): Promise<cacheManager.Cache> => {
      if (options.store === 'memory') {
        return cacheManager.caching('memory', {
          ttl: options.ttl,
          max: options.max,
        })
      }

      return cacheManager.caching(options.store, {
        ttl: options.ttl,
        max: options.max,
      })
    }

    if (Array.isArray(this.options)) {
      this.cache = cacheManager.multiCaching(
        await Promise.all(this.options.map((options) => createCacheFactory(options)))
      )
    } else {
      this.cache = await createCacheFactory(this.options)
    }
  }
}
