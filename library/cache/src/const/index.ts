/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:04:22
 */
import { CacheStore } from '../enum'

/**
 * @public
 *
 *  `A4 Cache` 配置信息默认值。
 *
 *  各参数说明，请查看 @see CacheModuleSchema
 *
 */
export const CACHE_MODULE_DEFAULT = {
  STORE: CacheStore.Memory,

  MEMORY: {
    TTL: 30000, // 30s
    MAX: 100,
  },

  REDIS: {
    TTL: 60000, // 30s
    MAX: 1000,

    OPTIONS: {
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    },
  },
} as const
