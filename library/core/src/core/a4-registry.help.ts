/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 17:26:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 18:24:01
 */
import { Logger } from '@nestjs/common'

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

  public constructor(a4App: A4Application) {
    this.a4App = a4App
  }

  /**
   *
   * @public
   *
   *  链接注册中心。
   *
   */
  public async start(): Promise<void> {
    const a4MicroService: IA4Registry = this.a4App.nestApp.get(A4_REGISTRY)
    const a4Network: IA4Network = this.a4App.nestApp.get(A4_NETWORK)

    await a4MicroService.start(a4Network.getHostAndPort())
  }

  /**
   *
   * @public
   *
   *  注销注册中心。
   *
   */
  public async stop(): Promise<void> {
    const a4MicroService: IA4Registry = this.a4App.nestApp.get(A4_REGISTRY)
    await a4MicroService.stop()
  }
}
