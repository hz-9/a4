/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-31 00:42:36
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 00:54:07
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
 * @public
 *
 *  多个类型加载对象配置项的联合类型
 *
 */
export type AllConfigPreOptions = IFileConfigPreOptions
