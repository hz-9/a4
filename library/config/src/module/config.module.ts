/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 11:05:03
 */
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'
import type { ClassConstructor } from 'class-transformer'

import { A4Error, A4ModuleBase, A4_CONFIG, ClassValidatorUtil, IA4ConfigModule } from '@hz-9/a4-core'
import _ from '@hz-9/a4-core/lodash'

import { ConfigModuleError } from '../errors'
import { AllConfigLoader, AllConfigPreOptions, FileConfigLoader } from '../loader'
import { A4Config } from './config'

interface IA4ConfigModuleOptions1 extends AllConfigPreOptions {
  ignoreSchema: true
  Schema?: ClassConstructor<object> | ClassConstructor<object>[]
}

interface IA4ConfigModuleOptions2 extends AllConfigPreOptions {
  ignoreSchema?: false
  Schema: ClassConstructor<object> | ClassConstructor<object>[]
}

/**
 *
 * @public
 *
 *  配置信息加载配置项。
 *
 */
export type IA4ConfigModuleOptions = IA4ConfigModuleOptions1 | IA4ConfigModuleOptions2

/**
 * @public
 *
 *  `A4 Config` 核心模块类。
 *
 */
@Module({})
export class A4ConfigModule implements A4ModuleBase, IA4ConfigModule {
  public static logger: Logger = new Logger('A4 Config')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.config' as const

  public static forRootAsync(options: Omit<FactoryProvider<IA4ConfigModuleOptions>, 'provide'>): DynamicModule {
    return {
      module: A4ConfigModule,

      providers: [
        {
          provide: A4_CONFIG,
          inject: options.inject,

          useFactory: async (...args) => {
            try {
              const configOptions = await options.useFactory(...args)
              const info = await this.loadConfigAndValidate(configOptions)
              return new A4Config(info)
            } catch (error: unknown) {
              /**
               * TODO 待完善的异常抛出机制。
               */
              if (error instanceof A4Error) throw error
              throw new ConfigModuleError((error as Error).message)
            }
          },
        },

        {
          provide: A4Config,
          useExisting: A4_CONFIG,
        },
      ],

      exports: [A4_CONFIG, A4Config],

      global: true,
    }
  }

  /**
   *
   * 支持多种方案加载配置。
   *
   */
  protected static async loadConfigAndValidate(options: IA4ConfigModuleOptions): Promise<object> {
    // eslint-disable-next-line no-undef-init
    let loader: AllConfigLoader | undefined = undefined

    if (options.type === undefined || options.type === 'file') {
      loader = new FileConfigLoader(options)
    }

    if (!loader) throw new Error('Unknown load config type.')

    const successLogger: string = loader.getSuccessLoggerMsg()
    const loadedConfig = await loader.asyncLoad()
    this.logger.log(successLogger)

    if (options.ignoreSchema === true) return loadedConfig

    if (!Array.isArray(options.Schema)) return ClassValidatorUtil.parse(options.Schema, loadedConfig)
    // 各个模块多次独立解析。
    let result: object = {}
    options.Schema.forEach((s: ClassConstructor<object>) => {
      const c = ClassValidatorUtil.parse(s, loadedConfig)
      result = _.merge(result, c)
    })
    return result
  }
}
