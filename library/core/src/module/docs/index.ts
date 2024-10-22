/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 20:56:21
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'

/**
 *
 * @public
 *
 *   `A4 Docs Module` Config Path
 *
 */
export const MODULE_CONFIG_PATH_A4_DOCS = 'A4.docs' as const

/**
 *
 * @public
 *
 *   `A4 Docs Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_DOCS: A4GlobalProvideToken = 'Global.A4.Docs'

/**
 *
 * @public
 *
 *   `A4 Docs Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_DOCS: A4ScopeProvideToken = 'Scope.A4.Docs'
