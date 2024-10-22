/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:26:29
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 22:53:06
 */

/* eslint-disable max-classes-per-file, @typescript-eslint/no-explicit-any */
import type {
  DynamicModule,
  ForwardReference,
  InjectionToken,
  Logger,
  OptionalFactoryDependency,
  Provider,
  Type,
} from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

import type { A4Error } from '../../error'
import type { A4GlobalProvideToken, A4ModuleConfigPath, A4ScopeProvideToken } from '../../interface'

// import type { ClassConstructor } from 'class-transformer'

// import type { A4GlobalProvideToken, A4ModuleConfigPath, A4ScopeProvideToken } from '../../interface'
// import type { IA4Config } from '../config'

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

/**
 * @public
 *
 * `A4ModuleBaseBuilder` 配置项类型。
 *
 */
export interface IA4ModuleBaseBuilderOptions {
  /**
   *
   * 模块实际需要的配置项结构。
   *
   */
  CoreSchema: ClassConstructor<any>

  /**
   *
   * 需要解析的数据数据结构。
   *
   * 是 `CoreSchema` 的超级。
   *
   * 需要保证 CoreSchema = Schema[configPath]
   *
   */
  Schema: ClassConstructor<any>

  /**
   * 实际业务类
   */
  ProvideClass: Type<any>

  /**
   * 抛错类
   */
  A4ModuleError: typeof A4Error

  /**
   *
   * 配置项的路径。
   *
   * 在参数获取中，会使用此路径进行获取。
   *
   */
  configPath: A4ModuleConfigPath

  /**
   * 进行全局注册时的 Porvide Token
   */
  globalProvideToken: A4GlobalProvideToken

  /**
   * 进行局部注册时的 Porvide Token
   */
  scopeProvideToken: A4ScopeProvideToken
}

/**
 * @internal
 *
 *  同步注册内容部扩展函数。
 *
 */
export interface IA4ModuleBaseResigterExtraOptions {
  optionsToProvideClassConstructorOptions: (configOptions: any) => Promise<object | object[]>
  logger: Logger
}

/**
 * @public
 *
 * Register 注册方式抽象类
 */
export abstract class A4ModuleBaseClassRegister {
  /**
   *  使用同步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   *``` ts
   * Module({
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
  public static register: <T>(options: IA4ModuleRegisterOptions<T>) => DynamicModule

  /**
   *  使用异步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   * ``` ts
   * Module({
   *    imports: [
   *      A4ConfigModule.registerAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   * ```
   *
   */
  public static registerAsync: <T>(options: IA4ModuleRegisterAsyncOptions<T>) => DynamicModule
}

/**
 * @public
 *
 * ForRoot 注册方式抽象类
 */
export abstract class A4ModuleBaseClassForRoot {
  /**
   *  使用同步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   * ``` ts
   * Module({
   *    imports: [
   *      A4ConfigModule.forRoot({
   *        ignoreSchema: true,
   *      }),
   *    ],
   *  })
   *  export class AppModule {}
   * ```
   *
   */
  public static forRoot: <T>(options: IA4ModuleForRootOptions<T>) => DynamicModule

  /**
   *  使用异步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   * ``` ts
   * Module({
   *    imports: [
   *      A4ConfigModule.forRootAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   * ```
   *
   */
  public static forRootAsync: <T>(options: IA4ModuleForRootAsyncOptions<T>) => DynamicModule
}

/**
 * @public
 *
 * Register 与 ForRoot 注册方式抽象类
 *
 */
export abstract class A4ModuleBaseClassRegisterAndForRoot {
  /**
   *  使用同步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   * ``` ts
   * Module({
   *    imports: [
   *      A4ConfigModule.register({
   *        ignoreSchema: true,
   *      }),
   *    ],
   *  })
   *  export class AppModule {}
   * ```
   *
   */
  public static register: <T>(options: IA4ModuleRegisterOptions<T>) => DynamicModule

  /**
   *  使用异步方式进行注册。默认为局部注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   * ``` ts
   * Module({
   *    imports: [
   *      A4ConfigModule.registerAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   * ```
   *
   */
  public static registerAsync: <T>(options: IA4ModuleRegisterAsyncOptions<T>) => DynamicModule

  /**
   *  使用同步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   * ``` ts
   * Module({
   *    imports: [
   *      A4ConfigModule.forRoot({
   *        ignoreSchema: true,
   *      }),
   *    ],
   *  })
   *  export class AppModule {}
   * ```
   *
   */
  public static forRoot: <T>(options: IA4ModuleForRootOptions<T>) => DynamicModule

  /**
   *  使用异步方式进行注册。默认为全局注册。
   *
   * @see https://hz-9.github.io/a4/overview/internal/module-register.html
   *
   * Example:
   *
   * ``` ts
   * Module({
   *    imports: [
   *      A4ConfigModule.forRootAsync({
   *        useFactory: async () => ({
   *          ignoreSchema: true,
   *        }),
   *      })
   *    ],
   *  })
   *  export class AppModule {}
   * ```
   *
   */
  public static forRootAsync: <T>(options: IA4ModuleForRootAsyncOptions<T>) => DynamicModule
}
