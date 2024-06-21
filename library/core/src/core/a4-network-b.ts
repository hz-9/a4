/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-21 12:34:31
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 12:39:41
 */
import { IA4AddressInfo, IA4HostAndPort, IA4Network } from '../module/network'

/**
 * @public
 */
export interface IA4NetworkBConstructorOptions {
  port: number
}

/**
 * @public
 *
 *  `A4 Network` 模块降级方案。
 *
 */
export class A4NetworkB implements IA4Network {
  public currentPort: number

  public constructor(options: IA4NetworkBConstructorOptions) {
    this.currentPort = options.port
  }

  public async getAvailablePort(): Promise<number> {
    return this.currentPort
  }

  public getAddressInfo(): IA4AddressInfo {
    return {
      bindIPv4: true,
      bindIPv6: false,
      ipv4: ['127.0.0.1'],
      ipv6: [],
      port: this.currentPort,
    }
  }

  public getHostAndPort(): IA4HostAndPort {
    return {
      host: '127.0.0.1',
      port: this.currentPort,
    }
  }
}
