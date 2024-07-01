/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 19:34:13
 */
import { Module } from '@nestjs/common'

import { A4ConfigBase, CU, IA4Config } from '@hz-9/a4-core'

import type { IDocsInfo } from '../interface'
import { A4DocsModuleSchema } from '../schema'
import { A4DocsModuleBase, A4DocsModuleProtectedBase } from './docs.module-definition'

export { GLOBAL_PROVIDE_TOKEN_A4_DOCS, SCOPE_PROVIDE_TOKEN_A4_DOCS, MODULE_CONFIG_PATH_A4_DOCS } from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 Docs` 核心模块类。
 *
 */
@Module({})
export class A4DocsModule extends A4DocsModuleBase {
  private static get _this(): A4DocsModuleProtectedBase {
    return this as unknown as A4DocsModuleProtectedBase
  }

  public static get defaultConfig(): IDocsInfo {
    const config: A4DocsModuleSchema = CU.p2CwD(A4DocsModuleSchema, {})
    const a4ConfigBase = new A4ConfigBase()

    return {
      ...config,
      statsInfo: a4ConfigBase.getA4StatsInfo(),
      pathInfo: a4ConfigBase.getA4PathInfo(),
    }
  }

  public static getConfig(
    a4Config: IA4Config<(typeof A4DocsModuleBase)['RootSchemaType']>,
    configKey?: string
  ): IDocsInfo {
    type ConfigKeyType = (typeof A4DocsModuleBase)['configPath']
    const config = a4Config.getOrThrow((configKey as ConfigKeyType) ?? this.configPath)

    return {
      ...config,
      statsInfo: a4Config.getA4StatsInfo(),
      pathInfo: a4Config.getA4PathInfo(),
    }
  }

  protected static async optionsToProvideClassConstructorOptions(options: IDocsInfo): Promise<IDocsInfo> {
    return options
  }
}
