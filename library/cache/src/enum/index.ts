/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 16:22:13
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 17:19:34
 */

/**
 * @public
 *
 *  缓存存储对象类型。
 *
 */
export enum CacheStore {
  /**
   * 使用内存存储
   */
  Memory = 'memory',

  /**
   * 使用 Redis 存储
   */
  Redis = 'redis',

  /**
   *
   * 使用 Memory + Redis 存储。
   *
   * Memory 作为一级缓存，Redis 作为二级缓存。
   *
   */
  MemoryRedis = 'memory-redis',
}
