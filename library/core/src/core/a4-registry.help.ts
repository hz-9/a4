/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 17:26:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 12:42:10
 */
import { Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'

import { A4_NETWORK, type IA4Network } from '../module/network'
import { A4_REGISTRY, type IA4Registry } from '../module/registry'
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

  public constructor(a4App: A4Application) {
    this.a4App = a4App

    const moduleRef: ModuleRef = this.a4App.nestApp.get(ModuleRef)
    try {
      this.a4Registry = moduleRef.get(A4_REGISTRY, { strict: false })
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
