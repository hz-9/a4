/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 02:52:08
 */
import portfinder from 'portfinder'

import { IA4AddressInfo, IA4HostAndPort, IA4Network } from '@hz-9/a4-core'

import type { INetworkInfo } from '../interface'

/**
 * @public
 *
 *  `A4 Network` 核心服务类。
 *
 */
export class A4Network implements IA4Network {
  public readonly options: INetworkInfo

  /**
   * 端口尝试次数。
   */
  public tryPortTimes: number

  public constructor(options: INetworkInfo) {
    this.options = options

    this.tryPortTimes = 0
  }

  /**
   * 应用程序当前使用的端口
   */
  public get currentPort(): number | undefined {
    return this.options.port
  }

  public set currentPort(newPort: number | undefined) {
    this.options.port = newPort
  }

  /**
   *
   * @public
   *
   *  获取有效端口，若多次获取，
   *
   *  根据 `NetworkModule.forRootAsync` 启动传入的端口相关参数，
   *  获取对应的端口相关信息。
   *
   *  此函数用作端口被占用后的重试获取，若初次使用，请使用 `getPort`。
   *
   */
  public async getAvailablePort(): Promise<number> {
    if (this.options.forcePort) return this.options.forcePort

    // 设置 baseline
    portfinder.setBasePort(this.options.portBaseline + this.tryPortTimes)

    const port = await portfinder.getPortPromise()

    this.tryPortTimes += 1
    return port
  }

  public getAddressInfo(): IA4AddressInfo {
    const { bindIPv4, bindIPv6, ipv4, ipv6 } = this.options

    return {
      port: this.currentPort ?? -1,

      bindIPv4,
      bindIPv6,

      ipv4: ipv4.map((i) => i.address),
      ipv6: ipv6.map((i) => i.address),
    }
  }

  public getHostAndPort(): IA4HostAndPort {
    return {
      host: this.options.defaultIPv4?.address ?? '127.0.0.1',
      port: this.currentPort ?? -1,
    }
  }
}
