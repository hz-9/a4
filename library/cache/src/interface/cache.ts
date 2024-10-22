/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 22:00:39
 */
import type { RedisStore, redisStore } from 'cache-manager-ioredis-yet'

type RedisOptions = Parameters<typeof redisStore>[0]

/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ICacheMemoryInfo = {
  store: 'memory'
  ttl: number
  max: number
}

/**
 * @public
 */
export type ICacheRedisInfo = {
  store: () => Promise<RedisStore>
  ttl: number
  max: number
} & Partial<RedisOptions>

/**
 * @public
 *
 *  `CacheModule` 在运行时，需要的数据结构。
 *
 */
export type ICacheInfo = ICacheMemoryInfo | ICacheRedisInfo | [ICacheMemoryInfo, ICacheRedisInfo]

/**
 * @public
 *
 *  A4Cache 构造函数参数
 *
 */
export type ICacheConstructorOptions = ICacheInfo
