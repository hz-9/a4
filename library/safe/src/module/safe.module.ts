/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 23:20:48
 */
import { Module } from '@nestjs/common'

import { IA4Config } from '@hz-9/a4-core'

import { A4SafeModuleSchema } from '../schema'
import { A4SafeModuleBase, A4SafeModuleProtectedBase } from './safe.module-definition'

export { GLOBAL_PROVIDE_TOKEN_A4_SAFE, SCOPE_PROVIDE_TOKEN_A4_SAFE, MODULE_CONFIG_PATH_A4_SAFE } from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 Safe` 核心模块类。
 *
 */
@Module({})
export class A4SafeModule extends A4SafeModuleBase {
  private static get _this(): A4SafeModuleProtectedBase {
    return this as unknown as A4SafeModuleProtectedBase
  }

  public static getConfig(
    a4Config: IA4Config<(typeof A4SafeModuleBase)['RootSchemaType']>,
    configKey?: string
  ): A4SafeModuleSchema {
    type ConfigKeyType = (typeof A4SafeModuleBase)['configPath']
    const config = a4Config.getOrThrow((configKey as ConfigKeyType) ?? this.configPath)
    return config
  }

  protected static async optionsToProvideClassConstructorOptions(
    options: A4SafeModuleSchema
  ): Promise<A4SafeModuleSchema> {
    return options
  }
}
