/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 17:33:44
 */
import { Module } from '@nestjs/common'
import RedisClient from 'ioredis'

import { Settings } from '../plugin/redlock_'
import { A4RedLockModuleSchema } from '../schema'
import { A4RedLockModuleBase } from './red.lock.module-definition'

/**
 * @public
 *
 *  `A4 Lock` 核心模块类。
 *
 */
@Module({})
export class A4RedLockModule extends A4RedLockModuleBase {
  public static async optionsToProvideClassConstructorOptions(
    options: A4RedLockModuleSchema
  ): Promise<[RedisClient[], Settings]> {
    const redisClients: RedisClient[] = []
    if (options.connects) {
      options.connects.forEach((c) => {
        redisClients.push(new RedisClient(c))
      })
    } else if (options.connect) {
      redisClients.push(new RedisClient(options.connect))
    }
    if (!redisClients.length) {
      const positions: string[] = [`'${this.CONFIG_PATH}.connect'`, `'${this.CONFIG_PATH}.connects'`]
      throw new Error(`Not found redis connect options in ${positions.join(' or ')}`)
    }

    return [redisClients, options.setting]
  }
}
