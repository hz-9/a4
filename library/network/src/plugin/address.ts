/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:40:16
 */
import * as DefaultGateway from 'default-gateway'
import os from 'node:os'

import { NetworkFamily } from '../enum'
import type { InterfaceInfo } from '../interface/address'
import type { IA4NetworkOptions, INetworkInfo } from '../interface/network'

/**
 *
 * @internal
 *
 *  参考 [address](https://www.npmjs.com/package/address) 进行调整的类文件。
 *
 *  支持 Windows、Linux、MacOS 操作系统的 IPv4 IPv6 mac 信息的查询操作。
 *
 */
export class Address {
  /**
   *
   * @internal
   *
   *  补全当前 ip 信息
   *
   * @param options - `NetworkModule` 配置项
   *
   * @returns 补全后的信息
   *
   */
  public static async getNetWorkInfo(options: IA4NetworkOptions): Promise<INetworkInfo> {
    const ipv4 = await this.getInterfaceList(NetworkFamily.IPv4)
    const ipv6 = await this.getInterfaceList(NetworkFamily.IPv6)

    const info: INetworkInfo = {
      ...options,

      ipv4,
      defaultIPv4: ipv4[0],
      ipv6,
      defaultIPv6: ipv6[0],

      mac: ipv4[0]?.mac,

      port: undefined,
    }

    return info
  }

  /**
   *
   * @internal
   *
   * 获取默认的网卡名称。
   *
   */
  public static async getDefaultInterfaceNameInMultiPlatform(family: NetworkFamily): Promise<string[]> {
    const platform = os.platform()

    const interfaceName: string[] = []

    const defaultGatewayFun = family === NetworkFamily.IPv4 ? DefaultGateway.v4 : DefaultGateway.v6

    try {
      const result = await defaultGatewayFun()
      interfaceName.push(result.interface)
    } catch (error) {
      /**
       * FIXME !!! 在 Jenkins 容器中，获取默认网关错误。也许无需进行更大层面修改
       */
    }

    // windows 环境，无法确认默认网卡名称。
    if (platform === 'win32') return [...interfaceName]

    if (platform === 'darwin') return ['en', ...interfaceName]

    return ['eth', ...interfaceName]
  }

  // typeof os.networkInterfaces family is a number (v18.0.0)
  // types: 'IPv4' | 'IPv6' => 4 | 6
  // @see https://github.com/nodejs/node/issues/42861
  private static _matchName(actualFamily: string | number, expectedFamily: string | number): boolean {
    if (expectedFamily === NetworkFamily.IPv4) {
      return actualFamily === NetworkFamily.IPv4 || actualFamily === 4
    }

    if (expectedFamily === NetworkFamily.IPv6) {
      return actualFamily === NetworkFamily.IPv6 || actualFamily === 6
    }

    return actualFamily === expectedFamily
  }

  /**
   *
   * @internal
   *
   *  获取当前默认网卡。
   *
   * @param family - 网络版本。可选。默认为 `ipv4`。
   * @param name - 制定网卡名称。可选。默认不传递。
   *
   */
  public static async getInterfaceList(family?: NetworkFamily, name?: string | string[]): Promise<InterfaceInfo[]> {
    const interfaces = os.networkInterfaces()
    const familyWithDefault = family || NetworkFamily.IPv4
    let defaultName = []

    if (name) {
      defaultName = typeof name === 'string' ? [name] : name
    } else {
      defaultName = await this.getDefaultInterfaceNameInMultiPlatform(familyWithDefault)
    }

    const list: InterfaceInfo[] = []

    defaultName.forEach((nameItem) => {
      for (let i = -1; i < 8; i += 1) {
        const interfaceName = `${nameItem}${i >= 0 ? i : ''}` // support 'lo' and 'lo0'
        const items = interfaces[interfaceName]

        if (items) {
          items.forEach((item) => {
            if (this._matchName(item.family, familyWithDefault)) {
              // 不会重复添加
              if (!list.find((j) => j.name === interfaceName)) list.push({ ...item, name: interfaceName })
            }
          })
        }
      }
    })

    return list
  }

  /**
   *
   * @internal
   *
   *  根据内设的默认网卡，获取网卡名称。
   *  获取当前默认网卡。
   *
   * @param family - 网络版本。可选。默认为 `ipv4`。
   * @param name - 制定网卡名称。可选。默认不传递。
   *
   */
  public static async getDefaultInterface(
    family?: NetworkFamily,
    name?: string
  ): Promise<os.NetworkInterfaceInfo | undefined> {
    const result = await this.getInterfaceList(family, name)

    return result.length ? result[0] : undefined
  }

  /**
   * @public
   *
   * 获取当前默认网卡名称。
   *
   * @param family - 网络版本。可选。默认为 `ipv4`。
   * @param name - 制定网卡名称。可选。默认不传递。
   *
   */
  public static async getDefaultInterfaceName(family?: NetworkFamily, name?: string): Promise<string | undefined> {
    const result = await this.getInterfaceList(family, name)

    return result.length ? result[0].name : undefined
  }
}
