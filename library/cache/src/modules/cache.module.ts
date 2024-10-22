/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 22:06:50
 */
import { A4ConfigBase, IA4Config } from '@hz-9/a4-core'
import { Module } from '@nestjs/common'
import { redisStore } from 'cache-manager-ioredis-yet'

import { CacheStore } from '../enum'
import { ICacheInfo } from '../interface'
import { A4CacheModuleSchema, A4CacheModuleSchemaA } from '../schema'
import { A4CacheModuleBase } from './cache.module-definition'

/**
 * @public
 *
 *  `A4 Cache` 核心模块类。
 *
 */
@Module({})
export class A4CacheModule extends A4CacheModuleBase {
  public static configToOptions(
    config: A4CacheModuleSchema,
    a4Config: IA4Config<A4CacheModuleSchemaA> = new A4ConfigBase<A4CacheModuleSchemaA>()
  ): ICacheInfo {
    if (config.store === CacheStore.Redis) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        store: (...args: any[]) => redisStore(...args),

        ...config.redis.connect,

        ttl: config.redis.ttl,
        max: config.redis.max,
      }
    }

    if (config.store === CacheStore.MemoryRedis) {
      return [
        {
          store: 'memory',
          ttl: config.memory.ttl,
          max: config.memory.max,
        },

        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          store: (...args: any[]) => redisStore(...args),
          ...config.redis.connect,

          ttl: config.redis.ttl,
          max: config.redis.max,
        },
      ]
    }

    return {
      store: 'memory',
      ttl: config.memory.ttl,
      max: config.memory.max,
    }
  }
}

// /**
//  *
//  * @public
//  *
//  *  `A4 Cache` 核心模块类。
//  *
//  */
// @Module({})
// export class A4CacheModule extends NestjsCacheModule implements A4ModuleBase, IA4CacheModule {
//   public static logger: Logger = new Logger('A4 Cache')

//   // eslint-disable-next-line @typescript-eslint/typedef
//   public static CONFIG_MIDDLE_PATH = 'A4.cache' as const

//   // eslint-disable-next-line @typescript-eslint/typedef
//   public static Schema = A4CacheModuleSchemaA

//   public Schema: A4CacheModuleSchemaA

//   public static forRootAsync(options: IA4ModuleForRootAsyncOptions<A4CacheModuleSchema>): DynamicModule {
//     return this.registerAsync({
//       // ...options,
//       inject: config.inject,
//       isGlobal: true,
//       useFactory: async (...args: unknown[]) => {
//         const result = await config.useFactory!(...args)
//         return this.toCacheOptions(result)
//       },
//     })
//   }

//   protected static toCacheOptions(options: A4CacheModuleSchema): CacheOptions {
//     if (config.store === CacheStore.Redis) {
//       return {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         store: (...args: any[]) => redisStore(...args),

//         ...config.redis.connect,

//         ttl: config.redis.ttl,
//         max: config.redis.max,
//       }
//     }

//     if (config.store === CacheStore.MemoryRedis) {
//       return [
//         {
//           store: 'memory',
//           ttl: config.memory.ttl,
//           max: config.memory.max,
//         },

//         {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           store: (...args: any[]) => redisStore(...args),
//           ...config.redis.connect,

//           ttl: config.redis.ttl,
//           max: config.redis.max,
//         },
//       ]
//     }

//     return {
//       store: 'memory',
//       ttl: config.memory.ttl,
//       max: config.memory.max,
//     }
//   }

//   public static getConfig(a4Config: IA4Config<A4CacheModule['Schema']>, configKey?: string): A4CacheModuleSchema {
//     const config = a4Config.getOrThrow((configKey as typeof this.CONFIG_MIDDLE_PATH) ?? this.CONFIG_MIDDLE_PATH)
//     return config
//   }
// }
