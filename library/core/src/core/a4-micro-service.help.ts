/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 17:26:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:56:17
 */
import { Logger } from '@nestjs/common'

import { A4_MICRO_SERVICE, type IA4MicroService } from '../module/micro-service'
import type { A4Application } from './a4-application'

/**
 * @public
 *
 *  `A4 MicroService` 在 A4Application 中的快捷调用对象。
 *
 */
export class A4MicroServiceHelp {
  protected readonly logger: Logger = new Logger('A4Application')

  protected readonly a4App: A4Application

  public constructor(a4App: A4Application) {
    this.a4App = a4App
  }

  /**
   *
   * @public
   *
   *  初始化所有微服务链接。
   *
   */
  public async connect(): Promise<void> {
    const a4MicroService: IA4MicroService = this.a4App.nestApp.get(A4_MICRO_SERVICE)
    await a4MicroService.connectMicroservices(this.a4App)
  }

  /**
   *
   * @public
   *
   *  开启所有微服务链接。
   *
   */
  public async start(): Promise<void> {
    const a4MicroService: IA4MicroService = this.a4App.nestApp.get(A4_MICRO_SERVICE)
    await a4MicroService.startMicroservices(this.a4App)
  }

  /**
   *
   * @public
   *
   *  关闭所有微服务链接。
   *
   */
  public async stop(): Promise<void> {
    const a4MicroService: IA4MicroService = this.a4App.nestApp.get(A4_MICRO_SERVICE)
    await a4MicroService.stopMicroservices(this.a4App)
  }

  /**
   *
   * @public
   *
   *  初始化所有微服务客户端。
   *
   */
  public async initClients(): Promise<void> {
    const a4MicroService: IA4MicroService = this.a4App.nestApp.get(A4_MICRO_SERVICE)
    await a4MicroService.initClients()
  }

  /**
   *
   * @public
   *
   *  链接所有微服务客户端。
   *
   */
  public async connectClients(): Promise<void> {
    const a4MicroService: IA4MicroService = this.a4App.nestApp.get(A4_MICRO_SERVICE)
    await a4MicroService.connectClients()
  }

  /**
   *
   * @public
   *
   *  关闭所有微服务客户端。
   *
   */
  public async closeClients(): Promise<void> {
    const a4MicroService: IA4MicroService = this.a4App.nestApp.get(A4_MICRO_SERVICE)
    await a4MicroService.closeClients()
  }
}
