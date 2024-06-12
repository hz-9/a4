/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:18:48
 */
import { ClientProxyFactory, MicroserviceOptions, RedisOptions, Transport } from '@nestjs/microservices'

import type { A4Application, IA4MicroService } from '@hz-9/a4-core'

import type { IA4MicroServiceContrustorOptions, MicroServiceClient } from '../interface'

/**
 *
 * @public
 *
 *  `A4MicroService` 类。
 *
 */
export class A4MicroService implements IA4MicroService {
  public readonly options: IA4MicroServiceContrustorOptions

  protected connectedNum: number = 0

  public readonly clients: MicroServiceClient[] = []

  public constructor(options: IA4MicroServiceContrustorOptions) {
    this.options = options
    this.clients = []
  }

  public async connectMicroservices(app: A4Application): Promise<void> {
    if (this.options.connect?.redis) this._connectedRedis(app, this.options.connect.redis)
  }

  public async startMicroservices(app: A4Application): Promise<void> {
    if (this.connectedNum > 0) {
      await app.nestApp.startAllMicroservices()
    }
  }

  public async stopMicroservices(app: A4Application): Promise<void> {
    /**
     * TODO 补全关闭功能。
     */
  }

  private _connectedRedis(app: A4Application, options: RedisOptions['options']): void {
    app.nestApp.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options,
    })
    this.connectedNum += 1
  }

  /**
   * 当仅有一个 client 时，可以调用此属性直接获取客户端。
   */
  public get client(): MicroServiceClient | undefined {
    return this.clients[0]
  }

  /**
   * @public
   *
   *  初始化 clients
   *
   */
  public async initClients(): Promise<void> {
    if (this.options.connect?.redis) {
      this.clients.push(this._initRedisClient(this.options.connect.redis))
    }
  }

  /**
   * @public
   *
   *  链接所有客户端。
   *
   */
  public async connectClients(): Promise<void> {
    if (this.clients.length) {
      await Promise.all(this.clients.map((i) => i.connect()))
    }
  }

  /**
   * @public
   *
   *  关闭所有客户端。
   *
   */
  public async closeClients(): Promise<void> {
    if (this.clients.length) {
      await Promise.all(this.clients.map((i) => i.close()))
    }
  }

  private _initRedisClient(options: RedisOptions['options']): MicroServiceClient {
    return ClientProxyFactory.create({
      transport: Transport.REDIS,
      options,
    })
  }
}
