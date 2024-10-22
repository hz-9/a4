/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 16:13:36
 */
import { Module } from '@nestjs/common'

import { A4SafeModuleBase } from './safe.module-definition'

export { GLOBAL_PROVIDE_TOKEN_A4_SAFE, SCOPE_PROVIDE_TOKEN_A4_SAFE, MODULE_CONFIG_PATH_A4_SAFE } from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 Safe` 核心模块类。
 *
 */
@Module({})
export class A4SafeModule extends A4SafeModuleBase {
  // ...
}
