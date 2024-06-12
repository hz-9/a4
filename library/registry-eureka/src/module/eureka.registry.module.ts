/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:36:32
 */
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'

import { A4ModuleBase, A4_REGISTRY, IA4Config, IA4RegistryModule } from '@hz-9/a4-core'

import { A4EurekaRegistryModuleSchema, A4EurekaRegistryModuleSchemaA } from '../schema'
import { A4EurekaRegistry } from './eureka.registry'

/**
 *
 * @public
 *
 *  `A4 Registry Eureka` 核心模块类。
 *
 */
@Module({})
export class A4EurekaRegsitryModule implements A4ModuleBase, IA4RegistryModule {
  public static logger: Logger = new Logger('A4 Registry')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.registry' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4EurekaRegistryModuleSchemaA

  public static forRootAsync(options: Omit<FactoryProvider<A4EurekaRegistryModuleSchema>, 'provide'>): DynamicModule {
    return {
      module: A4EurekaRegsitryModule,

      providers: [
        {
          provide: A4_REGISTRY,
          inject: options.inject,
          useFactory: async (...args) => {
            const result = await options.useFactory(...args)
            return new A4EurekaRegistry(result)
          },
        },

        {
          provide: A4EurekaRegistry,
          useExisting: A4_REGISTRY,
        },
      ],

      exports: [A4_REGISTRY, A4EurekaRegistry],

      global: true,
    }
  }

  public static getConfig(a4Config: IA4Config): A4EurekaRegistryModuleSchema {
    const config = a4Config.getOrThrow<A4EurekaRegistryModuleSchema>(this.CONFIG_MIDDLE_PATH)
    return config
  }
}
