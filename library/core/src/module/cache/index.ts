/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 20:56:17
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'

/**
 *
 * @public
 *
 *   `A4 Cache Module` Config Path
 *
 */
export const MODULE_CONFIG_PATH_A4_CACHE = 'A4.cache' as const

/**
 *
 * @public
 *
 *   `A4 Cache Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_CACHE: A4GlobalProvideToken = 'Global.A4.Cache'

/**
 *
 * @public
 *
 *   `A4 Cache Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_CACHE: A4ScopeProvideToken = 'Scope.A4.Cache'
