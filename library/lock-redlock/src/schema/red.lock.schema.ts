/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 17:22:32
 */

/* eslint-disable max-classes-per-file */
import { CU, IsOptionalNotNull } from '@hz-9/a4-core'
import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator'
import type { RedisOptions } from 'ioredis'

import { LOCK_MODULE_DEFAULT } from '../const'

/**
 *
 * @public
 *
 *  `A4 Lock Redlock Module` 配置项结构（.setting）。
 *
 */
export class A4RedLockSettingModuleSchema {
  /**
   *
   * 预期时钟漂移;详情请参阅:
   * http://redis.io/topics/distlock
   *
   */
  @IsOptionalNotNull()
  @IsNumber()
  public driftFactor: number = LOCK_MODULE_DEFAULT.SETTINGS.DRIFT_FACTOR

  /**
   *
   * 在发生错误之前，Redlock尝试锁定资源的最大次数。
   *
   */
  @IsOptionalNotNull()
  @IsNumber()
  public retryCount: number = LOCK_MODULE_DEFAULT.SETTINGS.RETRY_COUNT

  /**
   *
   * the time in ms between attempts
   *
   */
  @IsOptionalNotNull()
  @IsNumber()
  public retryDelay: number = LOCK_MODULE_DEFAULT.SETTINGS.RETRY_DELAY

  /**
   * 为了提高高争用下的性能，随机添加到重试的最大时间(以毫秒为单位)
   *
   * 参见 https://www.awsarchitectureblog.com/2015/03/backoff.html
   */
  @IsOptionalNotNull()
  @IsNumber()
  public retryJitter: number = LOCK_MODULE_DEFAULT.SETTINGS.RETRY_JITTER

  /**
   *
   * The minimum remaining time on a lock before an extension is automatically attempted with the `using` API.
   *
   */
  @IsOptionalNotNull()
  @IsNumber()
  public automaticExtensionThreshold: number = LOCK_MODULE_DEFAULT.SETTINGS.AUTOMATIC_EXTENSION_THRESHOLD
}

/**
 *
 * @public
 *
 *  `A4 Lock Redlock Module` 配置项结构。
 *
 */
export class A4RedLockModuleSchema {
  /**
   * Redis 数据库链接
   */
  @IsOptionalNotNull()
  @IsObject()
  public connect?: RedisOptions

  /**
   * 多节点时，传入 connects
   */
  @IsOptionalNotNull()
  @IsArray()
  public connects?: RedisOptions[]

  /**
   * Redlock 配置信息。
   */
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4RedLockSettingModuleSchema)
  public setting: A4RedLockSettingModuleSchema = CU.p2CwD(A4RedLockSettingModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Lock Redlock Module` 用于 Multi Schema 类型判断类（A4.lock）。
 *
 */
export class A4RedLockModuleSchemaC {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4RedLockModuleSchema)
  public readonly redlock: A4RedLockModuleSchema = CU.p2CwD(A4RedLockModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Lock Redlock Module` 用于 Multi Schema 类型判断类（A4）。
 *
 */
export class A4LockModuleSchemaB {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4RedLockModuleSchemaC)
  public readonly lock: A4RedLockModuleSchemaC = CU.p2CwD(A4RedLockModuleSchemaC, {})
}

/**
 *
 * @public
 *
 *  `A4 Lock Redlock Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4RedLockModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4LockModuleSchemaB)
  public readonly A4: A4LockModuleSchemaB
}
