/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-20 16:33:53
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'

/**
 *
 * @public
 *
 *   `A4Registry` Provide
 *
 */
export const MODULE_CONFIG_PATH_A4_REGISTRY = <T extends string>(str: T): `A4.registry.${T}` => `A4.registry.${str}`

/**
 *
 * @public
 *
 *   `A4 Registry Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_REGISTRY: A4GlobalProvideToken = 'Global.A4.Registry'

/**
 *
 * @public
 *
 *   `A4 Registry Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_REGISTRY: A4ScopeProvideToken = 'Scope.A4.Registry'
