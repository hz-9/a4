/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 18:07:18
 */
import helmet from 'helmet'

import type { A4Application, IA4Safe } from '@hz-9/a4-core'

import type { IA4SafeConstructorOptions } from '../interface'

/**
 *
 * @public
 *
 *  `A4 Safe` 类。
 *
 */
export class A4Safe implements IA4Safe {
  public readonly options: IA4SafeConstructorOptions

  public constructor(options: IA4SafeConstructorOptions) {
    this.options = options
  }

  /**
   * @public
   */
  public async init(app: A4Application): Promise<void> {
    if (this.options.cors.open) this._initCORS(app)
    if (this.options.helmet.open) this._initHelmet(app)
  }

  private _initCORS(app: A4Application): void {
    app.nestApp.enableCors(this.options.cors.options)
  }

  private _initHelmet(app: A4Application): void {
    app.nestApp.use(helmet(this.options.helmet.options))
  }
}
