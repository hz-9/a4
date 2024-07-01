/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-27 23:14:29
 */

export * from './interface'

/**
 *
 * @public
 *
 *   `A4Registry` Provide
 *
 * @param token - 基础名称
 *
 */
export const A4_REGISTRY_PROVIDE_TOKEN = (token: string): string => `A4.Registry.${token}`
