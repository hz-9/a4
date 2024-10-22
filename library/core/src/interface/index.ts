/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 22:44:15
 */

/**
 * @public
 *
 *  `A4` 全局提供者 Token。
 *
 */
export type A4GlobalProvideToken = `Global.A4.${string}`

/**
 * @public
 *
 * `A4` 作用域提供者 Token。
 *
 */
export type A4ScopeProvideToken = `Scope.A4.${string}`

/**
 * @public
 *
 * `A4` 配置项路径。
 *
 */
export type A4ModuleConfigPath = `A4.${string}`

export * from './entity'

export * from './util'
