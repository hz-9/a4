/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:37:48
 */
import { Module } from '@nestjs/common'

import { IA4Config } from '@hz-9/a4-core'

import type { INetworkInfo } from '../interface'
import { Address } from '../plugin/address'
import { A4NetworkModuleSchema } from '../schema'
import { A4NetworkModuleBase, A4NetworkModuleProtectedBase } from './network.module-definition'

export {
  GLOBAL_PROVIDE_TOKEN_A4_NETWORK,
  SCOPE_PROVIDE_TOKEN_A4_NETWORK,
  MODULE_CONFIG_PATH_A4_NETWORK,
} from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 Network` 核心模块类。
 *
 */
@Module({})
export class A4NetworkModule extends A4NetworkModuleBase {
  private static get _this(): A4NetworkModuleProtectedBase {
    return this as unknown as A4NetworkModuleProtectedBase
  }

  public static getConfig(
    a4Config: IA4Config<(typeof A4NetworkModuleBase)['RootSchemaType']>,
    configKey?: string
  ): A4NetworkModuleSchema {
    type ConfigKeyType = (typeof A4NetworkModuleBase)['configPath']
    const config = a4Config.getOrThrow((configKey as ConfigKeyType) ?? this.configPath)
    return config
  }

  protected static async optionsToProvideClassConstructorOptions(
    options: A4NetworkModuleSchema
  ): Promise<INetworkInfo> {
    const info = await Address.getNetWorkInfo(options)
    return info
  }
}
