/* eslint-disable @typescript-eslint/no-explicit-any, max-classes-per-file */
import { DynamicModule, FactoryProvider, InjectionToken, Logger, ModuleMetadata, Provider, Type } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import { A4Error } from '../../error'
import { A4GlobalProvideToken, A4ModuleConfigPath, A4ScopeProvideToken } from '../../interface'
import { A4Util } from '../../util/a4.util'
import { ClassValidatorUtil } from '../../util/class-validator.util'
import type { IA4Config } from '../config/interface'
import {
  IA4ModuleBase,
  IA4ModuleBaseBuilderTypeOptions,
  IA4ModuleBaseBuilderTypeOptionsDefault,
  IA4ModuleBaseSubType,
  IA4ModuleForRootAsyncOptions,
  IA4ModuleOptionsFactory,
  IA4ModuleRegisterAsyncOptions,
  IA4ModuleRegisterOptions,
} from './interface'

type IA4ModuleBaseBuilderConstructorOptions = {
  ProvideClass: Type<any>
  A4ModuleError: typeof A4Error
} & Pick<IA4ModuleBase, 'configPath' | 'globalProvideToken' | 'scopeProvideToken' | 'Schema' | 'RootSchema'>

/**
 *
 * @public
 *
 *  `A4 Module *` 库的核心类虚拟实现。
 *
 */
export class A4ModuleBaseBuilder<
  T = any,
  TO extends IA4ModuleBaseBuilderTypeOptions = IA4ModuleBaseBuilderTypeOptionsDefault,
> {
  public readonly buildOptions: IA4ModuleBaseBuilderConstructorOptions

  public constructor(options: IA4ModuleBaseBuilderConstructorOptions) {
    this.buildOptions = options
  }

  public build(): IA4ModuleBaseSubType<T, TO> {
    const buildThis = this

    class A4InternalModuleClass {
      public static logger: Logger = new Logger(this.name)

      public static get configPath(): A4ModuleConfigPath {
        return buildThis.buildOptions.configPath
      }

      public static get globalProvideToken(): A4GlobalProvideToken {
        return buildThis.buildOptions.globalProvideToken
      }

      public static get scopeProvideToken(): A4ScopeProvideToken {
        return buildThis.buildOptions.scopeProvideToken
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      public static get Schema(): ClassConstructor<any> {
        return buildThis.buildOptions.Schema
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      public static get RootSchema(): ClassConstructor<any> {
        return buildThis.buildOptions.RootSchema
      }

      protected static optionsToProvideClassConstructorOptions: (configOptions: any) => Promise<any>

      public static register(options: IA4ModuleRegisterOptions): DynamicModule {
        return this.commonRegister(this.scopeProvideToken, options, false)
      }

      public static forRoot(options: IA4ModuleRegisterOptions): DynamicModule {
        return this.commonRegister(this.globalProvideToken, options, true)
      }

      protected static commonRegister(
        provideName: InjectionToken,
        options: IA4ModuleRegisterOptions,
        isGlobal: boolean
      ): DynamicModule {
        const providers: Provider[] = [
          this.createAsyncProvider({
            provide: provideName,
            useFactory: async () => options,
          }),
        ]

        if (isGlobal) {
          providers.push({
            provide: buildThis.buildOptions.ProvideClass,
            useExisting: provideName,
          })
        }
        return {
          module: this,
          providers,
          exports: [provideName],
          global: isGlobal,
        }
      }

      public static registerAsync(options: IA4ModuleRegisterAsyncOptions): DynamicModule {
        const module = this.commonRegisterAsync({
          ...options,
          isGlobal: options.isGlobal ?? false,
        })

        return module
      }

      public static forRootAsync(options: IA4ModuleForRootAsyncOptions): DynamicModule {
        const module = this.commonRegisterAsync({
          ...options,
          isGlobal: options.isGlobal ?? true,
        })

        return module
      }

      protected static commonRegisterAsync(options: IA4ModuleRegisterAsyncOptions): DynamicModule {
        const asyncProvider = this.createAsyncProvider(options)

        const providers: Provider[] = [
          this.createAsyncProvider(options),

          {
            provide: buildThis.buildOptions.ProvideClass,
            useExisting: asyncProvider.provide,
          },
        ]

        if (options.useClass) providers.push(options.useClass)

        const exports: Required<ModuleMetadata>['exports'] = [
          asyncProvider.provide,
          buildThis.buildOptions.ProvideClass,
        ]

        /**
         * 全局环境下，保证 `GLOBAL_PROVIDE_TOKEN_*` 一定会被注册。
         */
        if (options.isGlobal && asyncProvider.provide !== buildThis.buildOptions.globalProvideToken) {
          providers.push({
            provide: buildThis.buildOptions.globalProvideToken,
            useExisting: asyncProvider.provide,
          })
          exports.push(buildThis.buildOptions.globalProvideToken)
        }

        if (options.extraProviders) {
          A4Util.contentExtraProviders(options.extraProviders, providers, exports, this.logger)
        }

        return {
          module: this,
          imports: options.imports,
          global: options.isGlobal,
          providers,
          exports,
        }
      }

      protected static createAsyncProvider(options: IA4ModuleRegisterAsyncOptions): FactoryProvider {
        const provide: InjectionToken =
          options.provide ?? (options.isGlobal ? this.globalProvideToken : this.scopeProvideToken)

        const { ProvideClass, A4ModuleError } = buildThis.buildOptions

        if (options.useFactory) {
          return {
            provide,
            inject: options.inject,
            useFactory: async (...args: unknown[]) => {
              try {
                const configOptions = await options.useFactory(...args)
                const provideClassConstructorOptions = await this.optionsToProvideClassConstructorOptions(configOptions)
                return new ProvideClass(provideClassConstructorOptions)
              } catch (error: unknown) {
                if (error instanceof A4Error) throw error
                throw new A4ModuleError((error as Error).message)
              }
            },
          }
        }

        const useExistingOrClass = options.useExisting || options.useClass
        return {
          provide,
          inject: useExistingOrClass ? [useExistingOrClass] : [],
          useFactory: async (optionsFactory: IA4ModuleOptionsFactory) => {
            try {
              const factory = optionsFactory.getA4ModuleOptions()
              const configOptions = factory instanceof Promise ? await factory : factory
              const provideClassConstructorOptions = await this.optionsToProvideClassConstructorOptions(configOptions)
              return new ProvideClass(provideClassConstructorOptions)
            } catch (error: unknown) {
              if (error instanceof A4Error) throw error
              throw new A4ModuleError((error as Error).message)
            }
          },
        }
      }

      public static get defaultConfig(): T {
        return ClassValidatorUtil.p2CwD(buildThis.buildOptions.Schema, {})
      }

      public static getConfig<P extends ClassConstructor<any>>(a4Config: IA4Config<P>, configKey?: string): T {
        throw new Error('Method not implemented.')
      }
    }

    return A4InternalModuleClass as unknown as IA4ModuleBaseSubType<T, TO>
  }
}
