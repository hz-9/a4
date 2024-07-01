/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-28 22:25:40
 */
import { DynamicModule, Logger, Module } from '@nestjs/common'

import {
  A4ModuleBase,
  A4_MICRO_SERVICE,
  IA4Config,
  IA4MicroServiceModule,
  IA4ModuleForRootAsyncOptions,
  IExceptionRule,
} from '@hz-9/a4-core'

import { MicroServiceExceptionRules } from '../exception-filter'
import { A4MicroServiceModuleSchema, A4MicroServiceModuleSchemaA } from '../schema'
import { A4MicroService } from './micro-service'

/**
 * @public
 *
 *  `A4 Micro Service` 核心模块类。
 *
 */
@Module({})
export class A4MicroServiceModule implements A4ModuleBase, IA4MicroServiceModule {
  public static logger: Logger = new Logger('A4 MicroService')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.microService' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4MicroServiceModuleSchemaA

  public Schema: A4MicroServiceModuleSchemaA

  public static exceptionRules: IExceptionRule[] = MicroServiceExceptionRules

  public static forRootAsync(options: IA4ModuleForRootAsyncOptions<A4MicroServiceModuleSchema>): DynamicModule {
    return {
      module: A4MicroServiceModule,

      providers: [
        {
          provide: A4_MICRO_SERVICE,
          inject: options.inject,
          useFactory: async (...args) => {
            const result = await options.useFactory!(...args)
            return new A4MicroService(result)
          },
        },

        {
          provide: A4MicroService,
          useExisting: A4_MICRO_SERVICE,
        },
      ],

      exports: [A4_MICRO_SERVICE, A4MicroService],

      global: true,
    }
  }

  public static getConfig(
    a4Config: IA4Config<A4MicroServiceModule['Schema']>,
    configKey?: string
  ): A4MicroServiceModuleSchema {
    const config = a4Config.getOrThrow((configKey as typeof this.CONFIG_MIDDLE_PATH) ?? this.CONFIG_MIDDLE_PATH)
    return config
  }
}
