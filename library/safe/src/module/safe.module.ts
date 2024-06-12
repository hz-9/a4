/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:27:19
 */
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'

import { A4ModuleBase, A4_SAFE, IA4Config, IA4SafeModule } from '@hz-9/a4-core'

import { A4SafeModuleSchema, A4SafeModuleSchemaA } from '../schema'
import { A4Safe } from './safe'

/**
 * @public
 *
 *  `A4 Safe` 核心模块类。
 *
 */
@Module({})
export class A4SafeModule implements A4ModuleBase, IA4SafeModule {
  public static logger: Logger = new Logger('A4 Safe')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.safe' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4SafeModuleSchemaA

  public static forRootAsync(options: Omit<FactoryProvider<A4SafeModuleSchema>, 'provide'>): DynamicModule {
    return {
      module: A4SafeModule,

      providers: [
        {
          provide: A4_SAFE,
          inject: options.inject,
          useFactory: async (...args) => {
            const result = await options.useFactory(...args)
            return new A4Safe(result)
          },
        },

        {
          provide: A4Safe,
          useExisting: A4_SAFE,
        },
      ],

      exports: [A4_SAFE, A4Safe],

      global: true,
    }
  }

  public static getConfig(a4Config: IA4Config): A4SafeModuleSchema {
    const config = a4Config.getOrThrow<A4SafeModuleSchema>(this.CONFIG_MIDDLE_PATH)
    return config
  }
}
