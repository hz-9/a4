/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 13:51:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 18:05:36
 */

/* eslint-disable max-classes-per-file */
import type { A4Application } from '../../core/a4-application'

/**
 *
 * @public
 *
 *  `A4 Safe Module` 抽象类。
 *
 */
export abstract class IA4SafeModule {}

/**
 *
 * @public
 *
 *  `A4 Safe` 抽象类。
 *
 */
export abstract class IA4Safe {
  public abstract init(app: A4Application): Promise<void>
}
