/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 17:47:47
 */
import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'

export * from './interface'
export * from './dto'
export * from './crud.util'

/**
 *
 * @public
 *
 *   `A4 CRUD Module` Config Path
 *
 */
export const MODULE_CONFIG_PATH_A4_CRUD = <T extends string>(str: T): `A4.crud.${T}` => `A4.crud.${str}`

/**
 *
 * @public
 *
 *   `A4 CRUD Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_CRUD: A4GlobalProvideToken = 'Global.A4.CRUD'

/**
 *
 * @public
 *
 *   `A4 CRUD Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_CRUD: A4ScopeProvideToken = 'Scope.A4.CRUD'

// // /**
// //  *
// //  * @public
// //  *
// //  *   `A4Crud` 的自定义异常解析规则。
// //  *
// //  */
// // export const A4_CRUD_EXCEPTION_RULES: string = 'A4.Crud.ExceptionRules'
