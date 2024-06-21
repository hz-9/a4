/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 17:26:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 12:18:51
 */
import { Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'

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

  protected readonly a4MicroService: IA4MicroService | undefined

  public constructor(a4App: A4Application) {
    this.a4App = a4App

    const moduleRef: ModuleRef = this.a4App.nestApp.get(ModuleRef)
    try {
      this.a4MicroService = moduleRef.get(A4_MICRO_SERVICE, { strict: false })
    } catch (error) {
      this.a4MicroService = undefined
    }
  }

  /**
   *
   * @public
   *
   *  初始化所有微服务链接。
   *
   */
  public async connect(): Promise<void> {
    if (this.a4MicroService) {
      await this.a4MicroService.connectMicroservices(this.a4App)
    } else {
      this.logger.debug(`'A4 Micro Service' is not loaded.`)
    }
  }

  /**
   *
   * @public
   *
   *  开启所有微服务链接。
   *
   */
  public async start(): Promise<void> {
    if (this.a4MicroService) {
      await this.a4MicroService.startMicroservices(this.a4App)
    } else {
      this.logger.debug(`'A4 Micro Service' is not loaded.`)
    }
  }

  /**
   *
   * @public
   *
   *  关闭所有微服务链接。
   *
   */
  public async stop(): Promise<void> {
    if (this.a4MicroService) {
      await this.a4MicroService.stopMicroservices(this.a4App)
    } else {
      this.logger.debug(`'A4 Micro Service' is not loaded.`)
    }
  }

  /**
   *
   * @public
   *
   *  初始化所有微服务客户端。
   *
   */
  public async initClients(): Promise<void> {
    if (this.a4MicroService) {
      await this.a4MicroService.initClients()
    } else {
      this.logger.debug(`'A4 Micro Service' is not loaded.`)
    }
  }

  /**
   *
   * @public
   *
   *  链接所有微服务客户端。
   *
   */
  public async connectClients(): Promise<void> {
    if (this.a4MicroService) {
      await this.a4MicroService.connectClients()
    } else {
      this.logger.debug(`'A4 Micro Service' is not loaded.`)
    }
  }

  /**
   *
   * @public
   *
   *  关闭所有微服务客户端。
   *
   */
  public async closeClients(): Promise<void> {
    if (this.a4MicroService) {
      await this.a4MicroService.closeClients()
    } else {
      this.logger.debug(`'A4 Micro Service' is not loaded.`)
    }
  }
}
