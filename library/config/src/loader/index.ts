/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-31 00:42:36
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 10:44:50
 */
import type { FileConfigLoader, IFileConfigPreOptions } from './file.loader'

export * from './file.loader'

/**
 * @public
 *
 *  多个类型加载对象的联合类型
 *
 */
export type AllConfigLoader = FileConfigLoader

/**
 *
 * @public
 *
 *  多个类型加载对象配置项的联合类型。
 *
 *  type 默认为 Default
 *
 */
export type AllConfigPreOptions = IFileConfigPreOptions
