/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:27:10
 */
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'
import RedisClient from 'ioredis'

import { A4ModuleBase, A4_LOCK, IA4Config, IA4LockModule } from '@hz-9/a4-core'

import { Redlock } from '../plugin/redlock_'
import { A4RedLockModuleSchema, A4RedLockModuleSchemaA } from '../schema'

/**
 * @public
 *
 *  `A4 Lock` 核心模块类。
 *
 */
@Module({})
export class A4RedlockLockModule implements A4ModuleBase, IA4LockModule {
  public static logger: Logger = new Logger('A4 Lock')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.lock' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4RedLockModuleSchemaA

  public static forRootAsync(options: Omit<FactoryProvider<A4RedLockModuleSchema>, 'provide'>): DynamicModule {
    return {
      module: A4RedlockLockModule,

      providers: [
        {
          provide: A4_LOCK,
          inject: options.inject,
          useFactory: async (...args) => {
            const result = await options.useFactory(...args)

            const clients = this._getIORedisClients(result)
            return this._toRedlock(clients, result)
          },
        },

        {
          provide: Redlock,
          useExisting: A4_LOCK,
        },
      ],

      exports: [A4_LOCK, Redlock],

      global: true,
    }
  }

  private static _getIORedisClients(options: A4RedLockModuleSchema): RedisClient[] {
    const redisClients: RedisClient[] = []

    if (options.connects) {
      options.connects.forEach((c) => {
        redisClients.push(new RedisClient(c))
      })
    } else if (options.connect) {
      redisClients.push(new RedisClient(options.connect))
    }

    return redisClients
  }

  private static _toRedlock(clients: RedisClient[], options: A4RedLockModuleSchema): Redlock {
    if (!clients.length) {
      const positions: string[] = [`'${this.CONFIG_MIDDLE_PATH}.connect'`, `'${this.CONFIG_MIDDLE_PATH}.connects'`]

      throw new Error(`Not found redis connect options in ${positions.join(' or ')}`)
    }

    const redlock = new Redlock(clients, options.setting)
    return redlock
  }

  public static getConfig(a4Config: IA4Config): A4RedLockModuleSchema {
    const config = a4Config.getOrThrow<A4RedLockModuleSchema>(this.CONFIG_MIDDLE_PATH)
    return config
  }
}
