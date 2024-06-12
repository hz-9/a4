/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:38:42
 */

/**
 * @public
 *
 *  `A4 Network` 配置信息默认值。
 *
 *  各参数说明，请查看 [NetworkModuleConfigSchema](TODO)。
 *
 */
export const NETWORK_MODULE_DEFAULT = {
  BIND_IPV4: true,

  BIND_IPV6: false,

  PORT_BASELINE: 16100,
} as const
