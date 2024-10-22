/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-20 16:41:02
 */
import { A4ConfigBase, IA4Config } from '@hz-9/a4-core'
import { Module } from '@nestjs/common'

import { IA4EurekaRegisterConstructorOptions } from '../interface'
import { A4EurekaRegistryModuleSchema, A4EurekaRegistryModuleSchemaA } from '../schema'
import { A4EurekaRegsitryModuleBase } from './eureka.registry.module-definition'

/**
 *
 * @public
 *
 *  `A4 Registry Eureka` 核心模块类。
 *
 */
@Module({})
export class A4EurekaRegsitryModule extends A4EurekaRegsitryModuleBase {
  public static configToOptions(
    config: A4EurekaRegistryModuleSchema,
    a4Config: IA4Config<A4EurekaRegistryModuleSchemaA> = new A4ConfigBase<A4EurekaRegistryModuleSchemaA>()
  ): IA4EurekaRegisterConstructorOptions {
    return config
  }
}
