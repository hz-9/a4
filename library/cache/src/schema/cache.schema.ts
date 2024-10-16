/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 03:24:47
 */

/* eslint-disable max-classes-per-file */
import type RedisStore from 'cache-manager-ioredis-yet'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsObject, ValidateNested } from 'class-validator'

import { CU, IsOptionalNotNull } from '@hz-9/a4-core'

import { CACHE_MODULE_DEFAULT } from '../const'
import { CacheStore } from '../enum'

type RedisStoreOptions = Parameters<(typeof RedisStore)['redisStore']>[0]

/**
 * @public
 *
 *  `A4 Cache Module` 配置项结构。(.memory)
 *
 */
export class A4CacheMemoryModuleSchema {
  /**
   * 缓存时间。
   *
   * 在 cache-manager 5.0.0 中，ttl 单位为秒。
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly ttl: number = CACHE_MODULE_DEFAULT.MEMORY.TTL

  /**
   * 最大缓存数量。
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly max: number = CACHE_MODULE_DEFAULT.MEMORY.MAX
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 配置项结构。(.redis)
 *
 */
export class A4CacheRedisModuleSchema {
  /**
   * 缓存时间。
   *
   * 在 cache-manager 5.0.0 中，ttl 单位为毫秒数。
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly ttl: number = CACHE_MODULE_DEFAULT.REDIS.TTL

  /**
   * 最大缓存数量。
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly max: number = CACHE_MODULE_DEFAULT.REDIS.MAX

  /**
   * 数据库链接信息，并未进行参数校验。
   */
  @IsOptionalNotNull()
  @IsObject()
  public readonly connect: RedisStoreOptions = CACHE_MODULE_DEFAULT.REDIS.OPTIONS as RedisStoreOptions
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 配置项结构。
 *
 */
export class A4CacheModuleSchema {
  /**
   * 缓存存储空间方案
   */
  @IsOptionalNotNull()
  @IsEnum(CacheStore)
  public store: CacheStore = CACHE_MODULE_DEFAULT.STORE

  @IsOptionalNotNull()
  @IsObject()
  @Type(() => A4CacheMemoryModuleSchema)
  @ValidateNested()
  public memory: A4CacheMemoryModuleSchema = CU.p2CwD(A4CacheMemoryModuleSchema, {})

  @IsOptionalNotNull()
  @IsObject()
  @Type(() => A4CacheRedisModuleSchema)
  @ValidateNested()
  public redis: A4CacheRedisModuleSchema = CU.p2CwD(A4CacheRedisModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 用于 Multi Schema 类型判断类（A4）。
 *
 */
export class A4CacheModuleSchemaB {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4CacheModuleSchema)
  public readonly cache: A4CacheModuleSchema = CU.p2CwD(A4CacheModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Cache Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4CacheModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4CacheModuleSchemaB)
  public readonly A4: A4CacheModuleSchemaB
}
