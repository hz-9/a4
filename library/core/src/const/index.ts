/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 20:06:53
 */

/**
 * @public
 *
 *  `http.listen` 默认配置。
 *
 */
export const HTTP_LISTEN_DEFAULT = {
  /**
   * 最大重试次数。
   */
  TRY_TIMES: 20,

  /**
   * 重试间隔。
   */
  TRY_INTERVAL: 300,
} as const

// /**
//  * @public
//  *
//  *  装饰器，RPC 声明前缀。
//  *
//  */
// export const RPC_CONTROLLER_PREFIX = 'a4:rpc:controller-prefix' as const
