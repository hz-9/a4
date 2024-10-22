/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 16:10:00
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'

/**
 *
 * @public
 *
 *   `A4 Lock Module` Config Path
 *
 */
export const MODULE_CONFIG_PATH_A4_LOCK = <T extends string>(str: T): `A4.lock.${T}` => `A4.lock.${str}`

/**
 *
 * @public
 *
 *   `A4 Lock Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_LOCK: A4GlobalProvideToken = 'Global.A4.Lock'

/**
 *
 * @public
 *
 *   `A4 Lock Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_LOCK: A4ScopeProvideToken = 'Scope.A4.Lock'
