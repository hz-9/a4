/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 13:51:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 16:53:15
 */

/* eslint-disable max-classes-per-file */
import type { A4Application } from '../../core/a4-application'

/**
 *
 * @public
 *
 *  `A4 Docs Module` 抽象类。
 *
 */
export abstract class IA4DocsModule {}

/**
 *
 * @public
 *
 *  `A4 Docs` 抽象类。
 *
 */
export abstract class IA4Docs {
  public abstract init(app: A4Application): Promise<void>
}
