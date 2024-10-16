/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 10:43:20
 */

/**
 *
 * @public
 *
 * `BaseLoad` 配置参数。
 *
 */
export interface IBaseConfigOptions {
  type?: string
}

/**
 *
 * @public
 *
 *  加载基类。
 *
 * T 合并默认值前的配置信息。
 * P 合并默认值后的配置信息。
 *
 */
export abstract class BaseConfigLoader<P extends IBaseConfigOptions, T extends IBaseConfigOptions> {
  protected readonly options: T

  public constructor(options: P) {
    this.options = this.withDefaultOptions(options)
  }

  /**
   * @internal
   *
   *  补全默认配置信息。
   *
   * @param options - 待合并的配置信息。
   *
   */
  protected abstract withDefaultOptions(options: P): T

  /**
   *
   * @public
   *
   *  异步获取配置信息。
   *
   */
  public abstract asyncLoad(): Promise<object>

  /**
   *
   * @public
   *
   *  异步获取配置信息。
   *
   */
  public abstract getSuccessLoggerMsg(): string
}
