/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:39:26
 */
import type { A4NetworkModuleSchema } from '../schema/network.schema'
import type { InterfaceInfo } from './address'

/**
 * @public
 *
 *  获取 Network 信息的配置信息。
 *
 */
export interface IA4NetworkOptions extends A4NetworkModuleSchema {}

/**
 *
 * @public
 *
 *  与 `IA4NetworkOPtions` 相比，增加了网卡与端口号的相关信息。
 *
 */
export interface INetworkInfo extends IA4NetworkOptions {
  /**
   * 若当前机器无网络时，`ipv4` 为 undefined
   */
  ipv4: InterfaceInfo[]

  /**
   * ipv4 数组的第一项
   */
  defaultIPv4?: InterfaceInfo

  /**
   *
   * 若当前机器无网络时，`ipv6` 为以下内容：
   *
   * ``` json
   * {
   *   address: '::1',
   *   netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
   *   family: 'IPv6',
   *   mac: '00:00:00:00:00:00',
   *   internal: true,
   *   cidr: '::1/128',
   *   scopeid: 0
   * }
   * ```
   *
   */
  ipv6: InterfaceInfo[]

  /**
   * ipv6 数组的第一项
   */
  defaultIPv6?: InterfaceInfo

  /**
   *
   * 为 `defaultIPv4` 的 `mac` 信息
   *
   * 仅当服务器无网络时，`mac` 为 undefined
   *
   */
  mac?: string

  /**
   *
   * 当前正在使用的端口。
   *
   * 在初始化 `app.listen` 之前，`port` 为 undefined
   *
   */
  port?: number
}
