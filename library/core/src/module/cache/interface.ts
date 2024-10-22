/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 13:51:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 21:23:54
 */

/* eslint-disable max-classes-per-file */
import type { A4Application } from '../../core/a4-application'

/**
 *
 * @public
 *
 *  `A4 Cache Module` 抽象类。
 *
 */
export abstract class IA4CacheModule {}

/**
 *
 * @public
 *
 *  `A4 Caceh` 抽象类。
 *
 */
export abstract class IA4Cache {
  public abstract init(app: A4Application): Promise<void>
}
