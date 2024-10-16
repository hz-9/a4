/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:00:20
 */
import { A4ConfigModuleError, A4ConfigParseError } from '../errors'
import { BaseConfigLoader, IBaseConfigOptions } from './base.loader'

/**
 *
 * @public
 *
 * `CustomConfigLoad` 配置参数（补全参数前）。
 *
 */
export interface ICustomConfigLoadOptions extends IBaseConfigOptions {
  type: 'custom'

  loader: () => Promise<object> | object
}

/**
 *
 * @internal
 *
 * `CustomConfigLoad` 配置参数（补全参数后）。
 *
 */
export interface ICustomConfigOptions extends Required<ICustomConfigLoadOptions> {
  // ...
}

/**
 *
 * @internal
 *
 *  通过 HTTP 协议请求信息。
 *
 */
export class CustomConfigLoader extends BaseConfigLoader<ICustomConfigLoadOptions, ICustomConfigOptions> {
  protected withDefaultOptions(options: ICustomConfigLoadOptions): ICustomConfigOptions {
    return options
  }

  public async asyncLoad(): Promise<object> {
    try {
      const run = this.options.loader()
      const result = run instanceof Promise ? await run : run

      return result
    } catch (error) {
      if (error instanceof A4ConfigModuleError) throw error
      throw new A4ConfigParseError((error as Error).message)
    }
  }

  public getSuccessLoggerMsg(): string {
    return `Loaded config with custom function.`
  }
}
