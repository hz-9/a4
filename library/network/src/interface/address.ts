import os from 'node:os'

/**
 * @public
 *
 *  网卡信息。扩展自 `os.NetworkInterfaceInfoIPv4`。
 *
 *  增加了 `name` 属性，用于保存网络实例名称。
 *
 */
export interface IInterfaceInfoIPv4 extends os.NetworkInterfaceInfoIPv4 {
  /**
   * 网络实例名称
   */
  name: string
}

/**
 * @public
 *
 *  网卡信息。扩展自 `os.NetworkInterfaceInfoIPv6`。
 *
 *  增加了 `name` 属性，用于保存网络实例名称。
 *
 */
export interface IInterfaceInfoIPv6 extends os.NetworkInterfaceInfoIPv6 {
  /**
   * 网络实例名称
   */
  name: string
}

/**
 * @public
 *
 *  网卡信息。包含 `InterfaceInfoIPv4` `InterfaceInfoIPv6` 接口。
 *
 */
export type InterfaceInfo = IInterfaceInfoIPv4 | IInterfaceInfoIPv6
