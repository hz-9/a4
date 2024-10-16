/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-26 23:53:44
 */

/* eslint-disable max-classes-per-file */
import { ModuleError } from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 Config Module` - Common exception.
 *
 *  `A4 配置模块` - 通用异常。
 *
 */
export class A4ConfigModuleError extends ModuleError {}

/**
 * @public
 *
 *  `A4 Config Module` - Configuration not found.
 *
 *  `A4 配置模块` - 配置未找到。
 *
 */
export class A4ConfigNotFoundError extends A4ConfigModuleError {}

/**
 * @public
 *
 *  `A4 Config Module` - Unknown Paramters
 *
 *  `A4 配置模块` - 未知属性
 *
 */
export class A4ConfigUnknownError extends A4ConfigModuleError {}

/**
 * @public
 *
 *  `A4 Config Module` - Parsing exception.
 *
 *  `A4 配置模块` - 解析异常。
 *
 */
export class A4ConfigParseError extends A4ConfigModuleError {}
