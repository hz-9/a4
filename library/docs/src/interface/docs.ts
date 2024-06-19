/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 17:29:42
 */
import type { IA4PathInfo, IA4StatusInfo } from '@hz-9/a4-core'

import type { A4DocsModuleSchema } from '../schema/docs.schema'

/**
 *
 * @public
 *
 *  `DocsModule` 在运行时，需要的数据结构。
 *
 */
export interface IDocsInfo extends A4DocsModuleSchema {
  statsInfo: IA4StatusInfo

  pathInfo: IA4PathInfo
}

/**
 * @public
 *
 *  A4Docs 构造函数参数
 *
 */
export interface IDocsConstructorOptions extends IDocsInfo {}
