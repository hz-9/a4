/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-25 10:15:59
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 10:16:11
 */
/**
 * @public
 *
 * 当前运行环境。
 *
 */
export class RunEnv {
  /**
   * 是否处于开发环境.
   */
  public static get isDev(): boolean {
    return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'
  }

  /**
   * 是否处于生产环境.
   */
  public static get isProd(): boolean {
    return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
  }

  /**
   * 是否处于 PKG 打包后的环境。
   */
  public static get inPKG(): boolean {
    // @ts-ignore
    return !!process.pkg
  }

  /**
   * 是否处于 `VS Code` 的 `Debugger` 模式下。
   */
  public static get inVSCodeDebugger(): boolean {
    return !!process.env.VSCODE_INSPECTOR_OPTIONS
  }

  /**
   * 是否处于 `Jest` 的单元测试环境下。
   */
  public static get inJest(): boolean {
    return process.env.JEST_WORKER_ID !== undefined
  }
}
