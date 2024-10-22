/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 21:28:50
 */
import { A4ConfigBase, CU, IA4Config } from '@hz-9/a4-core'
import { Module } from '@nestjs/common'

import type { IDocsInfo } from '../interface'
import { A4DocsModuleSchema, A4DocsModuleSchemaA } from '../schema'
import { A4DocsModuleBase } from './docs.module-definition'

export { GLOBAL_PROVIDE_TOKEN_A4_DOCS, SCOPE_PROVIDE_TOKEN_A4_DOCS, MODULE_CONFIG_PATH_A4_DOCS } from '@hz-9/a4-core'

/**
 *
 * @public
 *
 *  `A4 Docs` 核心模块类。
 *
 */
@Module({})
export class A4DocsModule extends A4DocsModuleBase {
  public static configToOptions(
    config: A4DocsModuleSchema,
    a4Config: IA4Config<A4DocsModuleSchemaA> = new A4ConfigBase<A4DocsModuleSchemaA>()
  ): IDocsInfo {
    return {
      ...config,

      statsInfo: a4Config.getA4StatsInfo(),
      pathInfo: a4Config.getA4PathInfo(),
    }
  }
}
