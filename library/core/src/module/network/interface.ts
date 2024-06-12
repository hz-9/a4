/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 12:45:59
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 01:35:09
 */

/* eslint-disable max-classes-per-file */

/**
 * @public
 */
export interface IA4AddressInfo {
  /**
   * 是否监听 IPv4。
   */
  bindIPv4: boolean

  /**
   * 是否监听 IPv4。
   */
  bindIPv6: boolean

  /**
   * IPv4 的有效地址。通常为内网 IP。
   */
  ipv4: string[]

  /**
   * IPv6 的有效地址。
   */
  ipv6: string[]

  /**
   * 当前使用端口
   */
  port: number
}

/**
 * @public
 *
 * IP 与 地址信息。
 *
 */
export interface IA4HostAndPort {
  host: string
  port: number
}

/**
 *
 * @public
 *
 * 获取一个有效端口。
 *
 * @param app - NestApplication 实例。
 * @returns 端口号。
 */
export type IA4NetworkModuleGetAvailablePort = () => Promise<number>

/**
 *
 * @public
 *
 * 获取 IA4AddressInfo 格式的信息。
 *
 * @param app - NestApplication 实例。
 * @returns @see IA4AddressInfo
 */
export type IA4NetworkModuleGetAddressInfo = () => IA4AddressInfo

/**
 *
 * @public
 *
 * 获取 IA4HostAndPort 格式的信息。
 *
 *  应在获取正确的 port 后运行，若在之前运行，port 值为 -1
 *
 * @param app - NestApplication 实例。
 * @returns @see IA4HostAndPort
 */
export type IA4NetworkModuleGetHostAndPort = () => IA4HostAndPort

/**
 *
 * @public
 *
 *  `A4 Network Module` 抽象类。
 *
 */
export abstract class IA4NetworkModule {
  // ...
}

/**
 *
 * @public
 *
 *  `A4Network` 抽象类。
 *
 */
export abstract class IA4Network {
  /**
   * 应用程序当前使用的端口
   */
  public currentPort: number | undefined

  /**
   * {@inheritDoc IA4NetworkModuleGetAvailablePort}
   */
  public getAvailablePort: IA4NetworkModuleGetAvailablePort

  /**
   * {@inheritDoc IA4NetworkModuleGetAddressInfo}
   */
  public getAddressInfo: IA4NetworkModuleGetAddressInfo

  /**
   * {@inheritDoc IA4NetworkModuleGetHostAndPort}
   */
  public getHostAndPort: IA4NetworkModuleGetHostAndPort
}
