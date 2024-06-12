/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:27:16
 */
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'

import { A4ModuleBase, A4_NETWORK, IA4Config, IA4NetworkModule } from '@hz-9/a4-core'

import { Address } from '../plugin/address'
import { A4NetworkModuleSchema, A4NetworkModuleSchemaA } from '../schema'
import { A4Network } from './network'

/**
 * @public
 *
 *  `A4 Network` 核心模块类。
 *
 */
@Module({})
export class A4NetworkModule implements A4ModuleBase, IA4NetworkModule {
  public static logger: Logger = new Logger('A4 Network')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.network' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4NetworkModuleSchemaA

  public static forRootAsync(options: Omit<FactoryProvider<A4NetworkModuleSchema>, 'provide'>): DynamicModule {
    return {
      module: A4NetworkModule,

      providers: [
        {
          provide: A4_NETWORK,
          inject: options.inject,
          useFactory: async (...args) => {
            const result = await options.useFactory(...args)
            const info = await Address.getNetWorkInfo(result)
            return new A4Network(info)
          },
        },

        {
          provide: A4Network,
          useExisting: A4_NETWORK,
        },
      ],

      exports: [A4_NETWORK, A4Network],

      global: true,
    }
  }

  public static getConfig(a4Config: IA4Config): A4NetworkModuleSchema {
    const config = a4Config.getOrThrow<A4NetworkModuleSchema>(this.CONFIG_MIDDLE_PATH)
    return config
  }
}
