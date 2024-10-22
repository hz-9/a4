/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-20 16:32:52
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'

/**
 *
 * @public
 *
 *   `A4 MicroService` Provide
 *
 */
export const MODULE_CONFIG_PATH_A4_MICRO_SERVICE = 'A4.microService' as const

/**
 *
 * @public
 *
 *   `A4 MicroService Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_MICRO_SERVICE: A4GlobalProvideToken = 'Global.A4.MicroService'

/**
 *
 * @public
 *
 *   `A4 MicroService Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_MICRO_SERVICE: A4ScopeProvideToken = 'Scope.A4.MicroService'
