/**
 * @Author       : Chen Zhen
 * @Date         : 2024-10-17 00:01:51
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 22:45:09
 */

/* eslint-disable @typescript-eslint/no-explicit-any, max-classes-per-file */

/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention */
import { DynamicModule, FactoryProvider, InjectionToken, Logger, ModuleMetadata, Provider } from '@nestjs/common'

import { A4Error } from '../../error'
import { A4GlobalProvideToken, A4ModuleConfigPath, A4ScopeProvideToken } from '../../interface'
import { A4Util } from '../../util/a4.util'
import { ClassValidatorUtil } from '../../util/class-validator.util'
import { A4ConfigBase, IA4Config } from '../config'
import {
  A4ModuleBaseClassForRoot,
  A4ModuleBaseClassRegister,
  A4ModuleBaseClassRegisterAndForRoot,
  IA4ModuleBaseBuilderOptions,
  IA4ModuleBaseResigterExtraOptions,
  IA4ModuleForRootAsyncOptions,
  IA4ModuleForRootOptions,
  IA4ModuleOptionsFactory,
  IA4ModuleRegisterAsyncOptions,
  IA4ModuleRegisterOptions,
} from './interface'

/**
 *
 * @public
 *
 *  `A4 Module *` 库的核心类构建器。
 *
 *  通过参数，快速构建 `A4 Module *` 核心模块类。
 *
 */
export class A4ModuleBaseClassBuilder<O extends any, T extends IA4ModuleBaseBuilderOptions> {
  public readonly buildOptions: T

  public constructor(options: T) {
    this.buildOptions = options
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected get commonRegister() {
    const buildThis = this

    /**
     *
     * 创建异步 Provider。
     *
     * @param options
     * @returns
     */
    const createAsyncProvider = (
      options: IA4ModuleRegisterAsyncOptions,

      extraOptions: IA4ModuleBaseResigterExtraOptions
    ): FactoryProvider => {
      const { ProvideClass, A4ModuleError, globalProvideToken, scopeProvideToken } = buildThis.buildOptions
      const provide: InjectionToken = options.provide ?? (options.isGlobal ? globalProvideToken : scopeProvideToken)

      if (options.useFactory) {
        return {
          provide,
          inject: options.inject,
          useFactory: async (...args: unknown[]) => {
            try {
              const configOptions = await options.useFactory(...args)
              const cOptions = await extraOptions.optionsToProvideClassConstructorOptions(configOptions)
              return Array.isArray(cOptions) ? new ProvideClass(...cOptions) : new ProvideClass(cOptions)
            } catch (error: unknown) {
              // extraOptions.logger.error(error)
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
            const cOptions = await extraOptions.optionsToProvideClassConstructorOptions(configOptions)
            return Array.isArray(cOptions) ? new ProvideClass(...cOptions) : new ProvideClass(cOptions)
          } catch (error: unknown) {
            if (error instanceof A4Error) throw error
            throw new A4ModuleError((error as Error).message)
          }
        },
      }
    }

    /**
     *
     * 被 register 和 forRoot 方法调用的具体注册函数。
     *
     * @param provideName
     * @param options
     * @param isGlobal
     */
    const commonRegister = (
      provideName: InjectionToken,
      options: IA4ModuleRegisterOptions,
      isGlobal: boolean,

      extraOptions: IA4ModuleBaseResigterExtraOptions
    ): Omit<DynamicModule, 'module'> => {
      const providers: Provider[] = [
        createAsyncProvider(
          {
            provide: provideName,
            useFactory: async () => options,
          },

          extraOptions
        ),
      ]

      if (isGlobal) {
        providers.push({
          provide: buildThis.buildOptions.ProvideClass,
          useExisting: provideName,
        })
      }

      return {
        // module: this,
        providers,
        exports: [provideName],
        global: isGlobal,
      }
    }

    /**
     * 被 registerAsync 和 forRootAsync 方法调用的具体注册函数。
     *
     * @param options - 注册选项。
     *
     */
    const commonRegisterAsync = (
      options: IA4ModuleRegisterAsyncOptions,

      extraOptions: IA4ModuleBaseResigterExtraOptions
    ): Omit<DynamicModule, 'module'> => {
      const asyncProvider = createAsyncProvider(options, extraOptions)

      const providers: Provider[] = [
        createAsyncProvider(options, extraOptions),

        {
          provide: buildThis.buildOptions.ProvideClass,
          useExisting: asyncProvider.provide,
        },
      ]

      if (options.useClass) providers.push(options.useClass)

      const exports: Required<ModuleMetadata>['exports'] = [asyncProvider.provide, buildThis.buildOptions.ProvideClass]

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
        A4Util.contentExtraProviders(options.extraProviders, providers, exports, extraOptions.logger)
      }

      return {
        // module: this,
        imports: options.imports,
        global: options.isGlobal,
        providers,
        exports,
      }
    }

    return {
      commonRegister,
      commonRegisterAsync,
    }
  }

  /**
   *
   * 不提供任一注册函数。
   *
   */
  public base() {
    const buildThis = this

    class A4ModuleBaseClassInternal {
      /**
       * @public
       *
       * 日志对象。通常与模块名称保持一致
       *
       * Example:
       *
       * ``` ts
       * 'A4ConfigModule' -> new Logger('A4 Config')
       *
       * 'A4NetworkModule' -> new Logger('A4 Network')
       * ```
       *
       */
      public static logger: Logger = new Logger(this.name)

      /**
       * @public
       *
       *  配置项的路径。由模块自行规定。`A4 Module` 会保持一定规则。
       *
       * @see https://hz-9.github.io/a4/guide/a4-config/namespace.html
       *
       */
      public static get CONFIG_PATH(): A4ModuleConfigPath {
        return buildThis.buildOptions.configPath
      }

      public static get Schema(): T['Schema'] {
        return buildThis.buildOptions.Schema
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      public static get CoreSchema(): T['CoreSchema'] {
        return buildThis.buildOptions.CoreSchema
      }

      public static get GLOBAL_PROVIDE_TOKEN(): A4GlobalProvideToken {
        return buildThis.buildOptions.globalProvideToken
      }

      public static get SCOPE_PROVIDE_TOKEN(): A4ScopeProvideToken {
        return buildThis.buildOptions.scopeProvideToken
      }

      /**
       * @public
       *
       * `A4Module.getConfig` 会快速获取配置信息。
       *
       * 针对 CoreSchema 与 实际接收配置信息匹配的模块。
       *
       * 若不匹配，可使用 `A4Module.getConfig` 自行实现。
       *
       * @param a4Config - `A4Config` 实例。
       * @param configKey - 配置路径。
       *
       * Example:
       *
       *  或者自己实现，以 A4 Network 举例。
       *
       * ``` ts
       *
       *  return a4Config.getOrThrow(configKey ?? NetworkModule.CONFIG_MIDDLE_PATH)
       *
       * ```
       */
      public static getConfig(
        a4Config: IA4Config<InstanceType<T['Schema']>>,
        configKey?: string
      ): InstanceType<T['CoreSchema']> {
        const config = a4Config.getOrThrow((configKey as T['configPath']) ?? this.CONFIG_PATH)
        return config as InstanceType<T['CoreSchema']>
      }

      /**
       * 提供默认参数。
       */
      public static get DEFAULT_CONFIG(): InstanceType<T['CoreSchema']> {
        return ClassValidatorUtil.p2CwD(buildThis.buildOptions.CoreSchema, {})
      }

      /**
       * this.configToOptions(this.DEFAULT_CONFIG) 语法糖
       */
      public static get DEFAULT_OPTIONS(): O {
        return this.configToOptions(this.DEFAULT_CONFIG)
      }

      /**
       *
       * 将 O 类型的配置项转换为 ProvideClass 构造函数参数。
       *
       */
      public static configToOptions(
        config: InstanceType<T['CoreSchema']>,
        a4Config: IA4Config<InstanceType<T['Schema']>> = new A4ConfigBase()
      ): O {
        return config
      }

      /**
       * this.configToOptions(this.getConfig(a4Config, configKey), a4Config) 语法糖
       */
      public static getOptions(a4Config: IA4Config<InstanceType<T['Schema']>>, configKey?: string): O {
        const config = this.getConfig(a4Config, configKey)
        return this.configToOptions(config, a4Config)
      }

      /**
       *
       * 将 O 类型的配置项转换为 ProvideClass 构造函数参数。
       *
       */
      public static async optionsToProvideClassConstructorOptions(configOptions: O): Promise<any> {
        return configOptions as any
      }
    }

    return A4ModuleBaseClassInternal
  }

  /**
   *
   * 提供 `register` 和 `registerAsync` 注册函数。
   *
   */
  public withRegister() {
    const { commonRegister, commonRegisterAsync } = this.commonRegister

    class A4ModuleBaseClassInternalRegister extends this.base() implements A4ModuleBaseClassRegister {
      public static register(options: IA4ModuleRegisterOptions<O>): DynamicModule {
        return {
          ...commonRegister(this.SCOPE_PROVIDE_TOKEN, options, false, {
            logger: this.logger,
            optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
          }),
          module: this,
        }
      }

      public static registerAsync(options: IA4ModuleRegisterAsyncOptions<O>): DynamicModule {
        return {
          ...commonRegisterAsync(
            {
              ...options,
              isGlobal: options.isGlobal ?? false,
            },
            {
              logger: this.logger,
              optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
            }
          ),
          module: this,
        }
      }
    }

    return A4ModuleBaseClassInternalRegister
  }

  /**
   *
   * 提供 `forRoot` 和 `forRootAsync` 注册函数。
   *
   */
  public withForRoot() {
    const { commonRegister, commonRegisterAsync } = this.commonRegister

    class A4ModuleBaseClassInternalRoot extends this.base() implements A4ModuleBaseClassForRoot {
      public static forRoot(options: IA4ModuleForRootOptions<O>): DynamicModule {
        return {
          ...commonRegister(this.GLOBAL_PROVIDE_TOKEN, options, true, {
            logger: this.logger,
            optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
          }),
          module: this,
        }
      }

      public static forRootAsync(options: IA4ModuleForRootAsyncOptions<O>): DynamicModule {
        return {
          ...commonRegisterAsync(
            {
              ...options,
              isGlobal: options.isGlobal ?? true,
            },
            {
              logger: this.logger,
              optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
            }
          ),
          module: this,
        }
      }
    }

    return A4ModuleBaseClassInternalRoot
  }

  public withRegisterAndForRoot() {
    const { commonRegister, commonRegisterAsync } = this.commonRegister

    class A4ModuleBaseClassInternalRegisterRoot extends this.base() implements A4ModuleBaseClassRegisterAndForRoot {
      public static register(options: IA4ModuleRegisterOptions<O>): DynamicModule {
        return {
          ...commonRegister(this.SCOPE_PROVIDE_TOKEN, options, false, {
            logger: this.logger,
            optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
          }),
          module: this,
        }
      }

      public static registerAsync(options: IA4ModuleRegisterAsyncOptions<O>): DynamicModule {
        return {
          ...commonRegisterAsync(
            {
              ...options,
              isGlobal: options.isGlobal ?? false,
            },
            {
              logger: this.logger,
              optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
            }
          ),
          module: this,
        }
      }

      public static forRoot(options: IA4ModuleForRootOptions<O>): DynamicModule {
        return {
          ...commonRegister(this.GLOBAL_PROVIDE_TOKEN, options, true, {
            logger: this.logger,
            optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
          }),
          module: this,
        }
      }

      public static forRootAsync(options: IA4ModuleForRootAsyncOptions<O>): DynamicModule {
        return {
          ...commonRegisterAsync(
            {
              ...options,
              isGlobal: options.isGlobal ?? true,
            },
            {
              logger: this.logger,
              optionsToProvideClassConstructorOptions: this.optionsToProvideClassConstructorOptions,
            }
          ),
          module: this,
        }
      }
    }

    return A4ModuleBaseClassInternalRegisterRoot
  }
}
