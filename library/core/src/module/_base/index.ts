/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:26:29
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 11:01:58
 */
import type { DynamicModule, FactoryProvider, Logger } from '@nestjs/common'

import type { A4Application } from '../../core/a4-application'
import type { IA4Config } from '../config'

/**
 * @public
 *
 *  `*_CONFIG` 的模版类型。
 *
 */
export interface IAbstractModule {
  MODULE_PROVIDE: symbol

  SERVICE_PROVIDE: symbol

  CONFIG_MIDDLE_PATH: string

  [K: string]: unknown
}

/**
 * @public
 *
 *  `A4ModuleBase` 的接口实现方案。
 *
 */
export interface IA4ModuleBase<P extends unknown[] = unknown[], R extends unknown = unknown> {
  /**
   * 在配置项中的路径。
   */
  CONFIG_MIDDLE_PATH: string

  init?: (app: A4Application, ...args: P) => R
  start?: (app: A4Application, ...args: P) => R
  stop?: (app: A4Application, ...args: P) => R
}

/**
 * @public
 *
 *  `A4 *` 库的核心类虚拟实现。
 *
 */
export abstract class A4ModuleBase {
  public static logger: Logger

  /**
   * 在配置项中的路径。
   */
  public static CONFIG_MIDDLE_PATH: string

  /**
   * 异步进行模块注册
   */
  public static forRootAsync: (options: Omit<FactoryProvider, 'provide'>) => DynamicModule

  // /**
  //  * `A4Plus.runInit` 会自动寻找对象的 init 函数并执行。
  //  */
  // public static init?: <P extends unknown[] = unknown[], R extends unknown = unknown>(
  //   app: A4Application,
  //   ...args: P
  // ) => R

  // /**
  //  * `A4Plus.runStart` 会自动寻找对象的 start 函数并执行。
  //  */
  // public static start?: <P extends unknown[] = unknown[], R extends unknown = unknown>(
  //   app: A4Application,
  //   ...args: P
  // ) => R

  /**
   * `A4Module.getConfig` 会快速获取配置信息。
   *
   *
   *  @example
   *
   *  或者自己实现，以 A4 Network 举例。
   *
   * ``` javascript
   *  const config = a4Config.getOrThrow<NetworkConfigSchema>(NetworkModule.CONFIG_MIDDLE_PATH)
   *  return config
   * ```
   */
  public static getConfig: <T = unknown>(a4Config: IA4Config) => T
}
