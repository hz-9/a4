/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:05:15
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'

/**
 *
 * @public
 *
 *   `A4 Log Module` Config Path
 *
 */
export const MODULE_CONFIG_PATH_A4_LOG = <T extends string>(str: T): `A4.log.${T}` => `A4.log.${str}`

// export const MODULE_CONFIG_PATH_A4_LOG = 'A4.log' as const

/**
 *
 * @public
 *
 *   `A4 Log Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_LOG: A4GlobalProvideToken = 'Global.A4.Log'

/**
 *
 * @public
 *
 *   `A4 Log Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_LOG: A4ScopeProvideToken = 'Scope.A4.Log'
