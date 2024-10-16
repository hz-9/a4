/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 17:26:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 19:49:41
 */
import { InjectionToken, Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'

import { type IA4Registry } from '../module/registry'
import type { A4Application } from './a4-application'

/**
 * @public
 *
 *  `A4 Registry` 在 A4Application 中的快捷调用对象。
 *
 */
export class A4RegistryHelp {
  protected readonly logger: Logger = new Logger('A4Application')

  protected readonly a4App: A4Application

  protected readonly a4Registry: IA4Registry | undefined

  public constructor(a4App: A4Application, provideToken: InjectionToken) {
    this.a4App = a4App

    const moduleRef: ModuleRef = this.a4App.nestApp.get(ModuleRef)
    try {
      this.a4Registry = moduleRef.get(provideToken, { strict: false })
    } catch (error) {
      this.a4Registry = undefined
    }
  }

  /**
   *
   * @public
   *
   *  链接注册中心。
   *
   */
  public async start(): Promise<void> {
    if (this.a4Registry) {
      await this.a4Registry.start(this.a4App.network.getHostAndPort())
    } else {
      this.logger.debug(`'A4 Registry' is not loaded.`)
    }
  }

  /**
   *
   * @public
   *
   *  注销注册中心。
   *
   */
  public async stop(): Promise<void> {
    if (this.a4Registry) {
      await this.a4Registry.stop()
    } else {
      this.logger.debug(`'A4 Registry' is not loaded.`)
    }
  }
}
