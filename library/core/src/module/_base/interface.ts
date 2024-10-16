/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:26:29
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:35:35
 */

/* eslint-disable max-classes-per-file */
import type {
  DynamicModule,
  FactoryProvider,
  ForwardReference,
  InjectionToken,
  Logger,
  OptionalFactoryDependency,
  Provider,
  Type,
} from '@nestjs/common'
import type { ClassConstructor } from 'class-transformer'

import type { A4GlobalProvideToken, A4ModuleConfigPath, A4ScopeProvideToken } from '../../interface'
import type { IA4Config } from '../config'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @public
 *
 *  `A4ModuleBase.register` 配置项类型。
 *
 */
export type IA4ModuleRegisterOptions<T = any> = T

/**
 * @public
 *
 *  `A4ModuleBase.forRoot` 配置项类型。
 *
 */
export type IA4ModuleForRootOptions<T = any> = T

/**
 * @public
 *
 *  `IA4ModuleRegisterAsyncOptions` 的 `useClass` `useExisting`  属性接口
 *
 */
export interface IA4ModuleOptionsFactory<T = any> {
  getA4ModuleOptions(): Promise<T> | T
}

/**
 * @public
 *
 *  `A4ModuleBase.registerAsync` 基础接口。
 *
 */
export interface IA4ModuleRegisterAsyncOptionsBase {
  /**
   * Injection token
   */
  provide?: InjectionToken

  /**
   * Extra providers to be registered within a scope of this module.
   *
   * TODO 如果和当前内置 provider 冲突,将会有 logger.error 信息.
   */
  extraProviders?: Provider[]

  /**
   * If "true', register `CacheModule` as a global module.
   *
   * Default: false
   */
  isGlobal?: boolean
}

/**
 * @public
 *
 *  `A4ModuleBase.forRootAsync` 基础接口。
 *
 */
export interface IA4ModuleForRootAsyncOptionsBase extends IA4ModuleRegisterAsyncOptionsBase {
  /**
   * If "true', register `CacheModule` as a global module.
   *
   * Default: true
   */
  isGlobal?: boolean
}

/**
 * @public
 *
 *  `A4ModuleBase.registerAsync` 与 `A4ModuleBase.forRootAsync` 使用 `useFactory` 与 `inject` 进行注册操作.
 *
 */
export interface IA4ModuleRegisterAsyncOptions1<T = any> {
  imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>

  useExisting?: undefined

  useClass?: undefined

  useFactory: (...args: any[]) => Promise<T> | T

  inject?: Array<InjectionToken | OptionalFactoryDependency>
}

/**
 * @public
 *
 *   `A4ModuleBase.registerAsync` 与 `A4ModuleBase.forRootAsync` 使用 `imports` 与 `useExisting` 进行注册操作.
 *
 */
export interface IA4ModuleRegisterAsyncOptions2<T = any> {
  imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>

  useExisting: Type<IA4ModuleOptionsFactory<T>>

  useClass?: undefined

  useFactory?: undefined

  inject?: undefined
}

/**
 * @public
 *
 *   `A4ModuleBase.registerAsync` 与 `A4ModuleBase.forRootAsync` 使用 `imports` 与 `useExisting` 进行注册操作.
 *
 */
export interface IA4ModuleRegisterAsyncOptions3<T = any> {
  imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>

  useExisting?: undefined

  useClass?: Type<IA4ModuleOptionsFactory<T>>

  useFactory?: undefined

  inject?: undefined
}

/**
 * @public
 *
 *  `A4ModuleBase.registerAsync` 配置项类型。
 *
 */
export type IA4ModuleRegisterAsyncOptions<T = any> = IA4ModuleRegisterAsyncOptionsBase &
  (IA4ModuleRegisterAsyncOptions1<T> | IA4ModuleRegisterAsyncOptions2<T> | IA4ModuleRegisterAsyncOptions3<T>)

/**
 * @public
 *
 *  `A4ModuleBase.forRootAsync` 配置项类型。
 *
 */
export type IA4ModuleForRootAsyncOptions<T = any> = IA4ModuleForRootAsyncOptionsBase &
  (IA4ModuleRegisterAsyncOptions1<T> | IA4ModuleRegisterAsyncOptions2<T> | IA4ModuleRegisterAsyncOptions3<T>)

export interface IA4ModuleBase<T = any> {
  /**
   * @public
   *
   *  配置项的路径。由模块自行规定。`A4 Module` 会保持一定规则。
   *
   * @see https://hz-9.github.io/a4/guide/a4-config/namespace.html
   *
   */
  readonly configPath: A4ModuleConfigPath

  readonly globalProvideToken: A4GlobalProvideToken

  readonly scopeProvideToken: A4ScopeProvideToken

  readonly RootSchema: ClassConstructor<any>

  readonly Schema: ClassConstructor<any>

  /**
   * @public
   *
   * 日志对象。通常与模块名称保持一致
   *
   * @expmale
   *
   * ``` ts
   * 'A4ConfigModule' -> new Logger('A4 Config')
   *
   * 'A4NetworkModule' -> new Logger('A4 Network')
   * ```
   *
   */
  readonly logger: Logger

  /**
   * @public
   *
   *  使用同步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.register({
   *        ignoreSchema: true,
   *      }),
   *    ],
   *  })
   *  export class AppModule {}
   *```
   *
   */
  register: (options: IA4ModuleRegisterOptions<T>) => DynamicModule

  /**
   * @public
   *
   *  使用异步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *  ``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.registerAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   *  ```
   *
   */
  registerAsync: (options: IA4ModuleRegisterAsyncOptions<T>) => DynamicModule

  /**
   * @public
   *
   *  使用同步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *  ``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.forRoot({
   *        ignoreSchema: true,
   *      }),
   *    ],
   *  })
   *  export class AppModule {}
   *  ```
   *
   */
  forRoot: (options: IA4ModuleForRootOptions<T>) => DynamicModule

  /**
   * @public
   *
   *  使用异步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *  ``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.forRootAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   *  ```
   *
   */
  forRootAsync: (options: IA4ModuleForRootAsyncOptions<T>) => DynamicModule

  /**
   * @public
   *
   * `A4Module.getConfig` 会快速获取配置信息。
   *
   * !!! 由各模块自行实现。
   *
   * @param a4Config - `A4Config` 实例。
   * @param configKey - 配置路径。
   *
   * @example
   *
   *  或者自己实现，以 A4 Network 举例。
   *
   * ``` ts
   *
   *  return a4Config.getOrThrow(configKey ?? NetworkModule.CONFIG_MIDDLE_PATH)
   *
   * ```
   */
  getConfig: (a4Config: IA4Config<any>, configKey?: string) => T

  readonly defaultConfig: T

  commonRegister: (provideName: InjectionToken, options: IA4ModuleForRootOptions<T>) => DynamicModule

  commonRegisterAsync: (options: IA4ModuleRegisterAsyncOptions<T>) => DynamicModule

  createAsyncProvider: (options: IA4ModuleRegisterAsyncOptions<T>) => FactoryProvider

  optionsToProvideClassConstructorOptions: (configOptions: T) => Promise<any>
}

export interface IA4ModuleBaseBuilderTypeOptions {
  registerType: 'register' | 'forRoot' | 'registerAndForRoot'
  scoped: 'public' | 'protected'
  withDefault: boolean

  configPath: string
  globalProvideToken: string
  scopeProvideToken: string
  Schema: ClassConstructor<any>
  RootSchema: ClassConstructor<any>

  SchemaType: any
  RootSchemaType: any
}

export interface IA4ModuleBaseBuilderTypeOptionsDefault {
  scoped: 'public'
  registerType: 'registerAndForRoot'
  withDefault: true

  configPath: string
  globalProvideToken: string
  scopeProvideToken: string
  Schema: ClassConstructor<any>
  RootSchema: ClassConstructor<any>

  SchemaType: any
  RootSchemaType: any
}

type IA4ModuleBasePublicKey =
  | 'logger'
  | 'configPath'
  | 'globalProvideToken'
  | 'scopeProvideToken'
  | 'RootSchema'
  | 'Schema'

type IA4ModuleBaseRootKey = 'forRoot' | 'forRootAsync'

type IA4ModuleBaseRegisterKey = 'register' | 'registerAsync'

type IA4ModuleBaseProtectedKey =
  | 'optionsToProvideClassConstructorOptions'
  | 'commonRegister'
  | 'commonRegisterAsync'
  | 'createAsyncProvider'

type IA4ModuleBaseWithDefaultKey = 'defaultConfig'

export type IA4ModuleBaseSubType<T, TO extends IA4ModuleBaseBuilderTypeOptions> = {
  new (): {
    // [K in keyof TO as (K extends IA4ModuleBasePublicKey ? K : never)]: TO[K]
  }
} & {
  [K in IA4ModuleBasePublicKey]: K extends keyof TO ? TO[K] : IA4ModuleBase<T>[K]
} & {
  getConfig: (a4Config: IA4Config<TO['RootSchemaType']>, configKey?: string) => T

  RootSchemaType: TO['RootSchemaType']
  SchemaType: TO['SchemaType']
} & {
  [K in IA4ModuleBaseRootKey as TO['registerType'] extends 'forRoot' | 'registerAndForRoot'
    ? K
    : never]: IA4ModuleBase<T>[K]
} & {
  [K in IA4ModuleBaseRegisterKey as TO['registerType'] extends 'register' | 'registerAndForRoot'
    ? K
    : never]: IA4ModuleBase<T>[K]
} & {
  [K in IA4ModuleBaseProtectedKey as TO['scoped'] extends 'protected' ? K : never]: IA4ModuleBase<T>[K]
} & {
  [K in IA4ModuleBaseWithDefaultKey as TO['withDefault'] extends true ? K : never]: IA4ModuleBase<T>[K]
}

/**
 *
 * @public
 *
 *  `A4 Module *` 库的核心类虚拟实现。
 *
 */
export abstract class A4ModuleBase {
  /**
   * @public
   *
   * 日志对象。通常与模块名称保持一致
   *
   * @expmale
   *
   * ``` ts
   * 'A4ConfigModule' -> new Logger('A4 Config')
   *
   * 'A4NetworkModule' -> new Logger('A4 Network')
   * ```
   *
   */
  protected static logger: Logger

  /**
   * @public
   *
   *  配置项的路径。由模块自行规定。`A4 Module` 会保持一定规则。
   *
   * @see https://hz-9.github.io/a4/guide/a4-config/namespace.html
   *
   */
  protected static CONFIG_MIDDLE_PATH: string

  /**
   * @public
   *
   *  使用同步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.register({
   *        ignoreSchema: true,
   *      }),
   *    ],
   *  })
   *  export class AppModule {}
   *```
   *
   */
  public static register: (options: IA4ModuleRegisterOptions) => DynamicModule

  /**
   * @public
   *
   *  使用异步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *  ``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.registerAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   *  ```
   *
   */
  public static registerAsync: (options: IA4ModuleRegisterAsyncOptions) => DynamicModule

  /**
   * @public
   *
   *  使用同步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *  ``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.forRoot({
   *        ignoreSchema: true,
   *      }),
   *    ],
   *  })
   *  export class AppModule {}
   *  ```
   *
   */
  public static forRoot: (options: IA4ModuleForRootOptions) => DynamicModule

  /**
   * @public
   *
   *  使用异步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * @example
   *
   *  ``` ts
   * \@Module({
   *    imports: [
   *      A4ConfigModule.forRootAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   *  ```
   *
   */
  public static forRootAsync: (options: IA4ModuleForRootAsyncOptions) => DynamicModule

  /**
   * @public
   *
   * `A4Module.getConfig` 会快速获取配置信息。
   *
   * @param a4Config - `A4Config` 实例。
   * @param configKey - 配置路径。
   *
   * @example
   *
   *  或者自己实现，以 A4 Network 举例。
   *
   * ``` ts
   *
   *  return a4Config.getOrThrow(configKey ?? NetworkModule.CONFIG_MIDDLE_PATH)
   *
   * ```
   */
  public static getConfig: <Schema extends object, Return>(a4Config: IA4Config<Schema>, configKey?: string) => Return

  protected static commonRegister: (provideName: InjectionToken, options: IA4ModuleForRootOptions) => DynamicModule

  protected static commonRegisterAsync: (options: IA4ModuleRegisterAsyncOptions) => DynamicModule

  protected static createAsyncProvider: (options: IA4ModuleRegisterAsyncOptions) => FactoryProvider

  protected static optionsToFactoryResult: (configOptions: any) => Promise<any>
}
