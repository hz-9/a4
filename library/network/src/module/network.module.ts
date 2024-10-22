/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 00:59:32
 */
import { Module } from '@nestjs/common'

import type { INetworkInfo } from '../interface'
import { Address } from '../plugin/address'
import { A4NetworkModuleSchema } from '../schema'
import { A4NetworkModuleBase } from './network.module-definition'

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
  public static async optionsToProvideClassConstructorOptions(options: A4NetworkModuleSchema): Promise<INetworkInfo> {
    const info = await Address.getNetWorkInfo(options)
    return info
  }
}
