/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:19:24
 */
import type { IA4PathInfo, IA4StatsInfo } from '@hz-9/a4-core'

import type { A4DocsModuleSchema } from '../schema/docs.schema'

/**
 *
 * @public
 *
 *  `DocsModule` 在运行时，需要的数据结构。
 *
 */
export interface IDocsInfo extends A4DocsModuleSchema {
  statsInfo: IA4StatsInfo

  pathInfo: IA4PathInfo
}

/**
 * @public
 *
 *  A4Docs 构造函数参数
 *
 */
export interface IDocsConstructorOptions extends IDocsInfo {}
