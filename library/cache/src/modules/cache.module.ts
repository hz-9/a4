/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:27:02
 */
import { CacheOptions, CacheModule as NestjsCacheModule } from '@nestjs/cache-manager'
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'
import { redisStore } from 'cache-manager-ioredis-yet'

import { A4ModuleBase, IA4CacheModule, IA4Config } from '@hz-9/a4-core'

import { CacheStore } from '../enum'
import { A4CacheModuleSchema, A4CacheModuleSchemaA } from '../schema'

/**
 *
 * @public
 *
 *  `A4 Cache` 核心模块类。
 *
 */
@Module({})
export class A4CacheModule extends NestjsCacheModule implements A4ModuleBase, IA4CacheModule {
  public static logger: Logger = new Logger('A4 Cache')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.cache' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4CacheModuleSchemaA

  public static forRootAsync(options: Omit<FactoryProvider<A4CacheModuleSchema>, 'provide'>): DynamicModule {
    return this.registerAsync({
      ...options,

      isGlobal: true,
      useFactory: async (...args: unknown[]) => {
        const result = await options.useFactory(...args)
        return this.toCacheOptions(result)
      },
    })
  }

  protected static toCacheOptions(options: A4CacheModuleSchema): CacheOptions {
    if (options.store === CacheStore.Redis) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        store: (...args: any[]) => redisStore(...args),

        ...options.redis.connect,

        ttl: options.redis.ttl,
        max: options.redis.max,
      }
    }

    if (options.store === CacheStore.MemoryRedis) {
      return [
        {
          store: 'memory',
          ttl: options.memory.ttl,
          max: options.memory.max,
        },

        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          store: (...args: any[]) => redisStore(...args),
          ...options.redis.connect,

          ttl: options.redis.ttl,
          max: options.redis.max,
        },
      ]
    }

    return {
      store: 'memory',
      ttl: options.memory.ttl,
      max: options.memory.max,
    }
  }

  public static getConfig(a4Config: IA4Config): A4CacheModuleSchema {
    const config = a4Config.getOrThrow<A4CacheModuleSchema>(this.CONFIG_MIDDLE_PATH)
    return config
  }
}
