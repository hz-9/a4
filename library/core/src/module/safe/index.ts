/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 23:14:51
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'

/**
 *
 * @public
 *
 *   `A4 Safe Module` Network Path
 *
 */
export const MODULE_CONFIG_PATH_A4_SAFE = 'A4.safe' as const

/**
 *
 * @public
 *
 *   `A4 Safe Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_SAFE: A4GlobalProvideToken = 'Global.A4.Safe'

/**
 *
 * @public
 *
 *   `A4 Safe Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_SAFE: A4ScopeProvideToken = 'Scope.A4.Safe'
