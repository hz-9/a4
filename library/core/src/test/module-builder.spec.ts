/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 02:07:06
 */

/* eslint-disable max-classes-per-file */
import { DynamicModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Type } from 'class-transformer'
import { IsNumber, IsObject, ValidateNested } from 'class-validator'
import { get } from 'lodash'
import 'reflect-metadata'
import { A4Error } from 'src/error'

import { IsOptionalNotNull } from '../decorator'
import type { A4GlobalProvideToken, A4ModuleConfigPath, A4ScopeProvideToken } from '../interface'
import {
  A4ModuleBaseClassBuilder,
  type IA4Config,
  type IA4ModuleForRootAsyncOptions,
  type IA4ModuleForRootOptions,
  type IA4ModuleRegisterAsyncOptions,
  type IA4ModuleRegisterOptions,
} from '../module'
import { ClassValidatorUtil as CU } from '../util/class-validator.util'
import type { Equal, Expect } from './_debug'

// import { IsId } from '../decorator/is-id.decorator'
// import e from 'express'

class A4ModuleClassCoreSchema {
  /**
   * 缓存时间。
   *
   * 在 cache-manager 5.0.0 中，ttl 单位为秒。
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly ttl: number = 60

  /**
   * 最大缓存数量。
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly max: number = 300
}

class A4ModuleClassSubSchema {
  @IsObject()
  @ValidateNested()
  @Type(() => A4ModuleClassCoreSchema)
  public readonly module1: A4ModuleClassCoreSchema = CU.p2CwD(A4ModuleClassCoreSchema, {})
}

class A4ModuleClassSchema {
  @IsObject()
  @ValidateNested()
  @Type(() => A4ModuleClassSubSchema)
  public readonly A4: A4ModuleClassSubSchema = CU.p2CwD(A4ModuleClassSubSchema, {})
}

class A4ModuleInstanceClass {
  // constructor() {}
}

const options = {
  Schema: A4ModuleClassSchema,
  CoreSchema: A4ModuleClassCoreSchema,
  ProvideClass: A4ModuleInstanceClass,
  A4ModuleError: A4Error,

  configPath: 'A4.module1',
  globalProvideToken: 'Global.A4.A4ModuleClass',
  scopeProvideToken: 'Scope.A4.A4ModuleClass',
} as const

describe('Module Builder', () => {
  it('Base', () => {
    const A4ModuleClass = new A4ModuleBaseClassBuilder<A4ModuleClassCoreSchema, typeof options>(options).base()

    expect(A4ModuleClass).toBeTruthy()

    // Schema
    expect(A4ModuleClass.Schema).toBe(A4ModuleClassSchema)

    // CoreSchema
    expect(A4ModuleClass.CoreSchema).toBe(A4ModuleClassCoreSchema)

    // configPath 属性
    expect(A4ModuleClass.CONFIG_PATH).toBe('A4.module1')

    // globalProvideToken
    expect(A4ModuleClass.GLOBAL_PROVIDE_TOKEN).toBe('Global.A4.A4ModuleClass')

    // scopeProvideToken
    expect(A4ModuleClass.SCOPE_PROVIDE_TOKEN).toBe('Scope.A4.A4ModuleClass')

    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    type cases = [
      Expect<Equal<typeof A4ModuleClass.Schema, typeof A4ModuleClassSchema>>,

      Expect<Equal<typeof A4ModuleClass.CoreSchema, typeof A4ModuleClassCoreSchema>>,

      Expect<Equal<typeof A4ModuleClass.CONFIG_PATH, A4ModuleConfigPath>>,

      Expect<Equal<typeof A4ModuleClass.GLOBAL_PROVIDE_TOKEN, A4GlobalProvideToken>>,

      Expect<Equal<typeof A4ModuleClass.SCOPE_PROVIDE_TOKEN, A4ScopeProvideToken>>,

      Expect<Equal<A4ModuleClassCoreSchema, InstanceType<typeof A4ModuleClassCoreSchema>>>,
    ]
  })

  it('Register', async () => {
    const A4ModuleClass = new A4ModuleBaseClassBuilder<A4ModuleClassCoreSchema, typeof options>(options).withRegister()

    // register function
    expect(A4ModuleClass.register).toBeTruthy()
    expect(A4ModuleClass.registerAsync).toBeTruthy()
    // @ts-expect-error
    expect(A4ModuleClass.forRoot).toBeUndefined()
    // @ts-expect-error
    expect(A4ModuleClass.forRootAsync).toBeUndefined()

    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    type cases = [
      Expect<
        Equal<
          typeof A4ModuleClass.register,
          (options: IA4ModuleRegisterOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,

      Expect<
        Equal<
          typeof A4ModuleClass.registerAsync,
          (options: IA4ModuleRegisterAsyncOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,
    ]

    /**
     *
     * 使用 register 注册模块。（局部注册）
     *
     * 仅支持通过 `moduleRef.get(A4ModuleClass.SCOPE_PROVIDE_TOKEN)` 获取到实例。
     *
     */
    const moduleRef = await Test.createTestingModule({
      imports: [A4ModuleClass.register(A4ModuleClass.DEFAULT_CONFIG)],
    }).compile()

    expect(moduleRef.get(A4ModuleClass.SCOPE_PROVIDE_TOKEN)).toBeInstanceOf(A4ModuleInstanceClass)

    expect(() => {
      moduleRef.get(A4ModuleInstanceClass)
    }).toThrow()
    expect(() => {
      moduleRef.get(A4ModuleClass.GLOBAL_PROVIDE_TOKEN)
    }).toThrow()
  })

  it('ForRoot', () => {
    const A4ModuleClass = new A4ModuleBaseClassBuilder<A4ModuleClassCoreSchema, typeof options>(options).withForRoot()

    // register function
    expect(A4ModuleClass.forRoot).toBeTruthy()
    expect(A4ModuleClass.forRootAsync).toBeTruthy()
    // @ts-expect-error
    expect(A4ModuleClass.register).toBeUndefined()
    // @ts-expect-error
    expect(A4ModuleClass.registerAsync).toBeUndefined()

    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    type cases = [
      Expect<
        Equal<
          typeof A4ModuleClass.forRoot,
          (options: IA4ModuleForRootOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,

      Expect<
        Equal<
          typeof A4ModuleClass.forRootAsync,
          (options: IA4ModuleForRootAsyncOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,
    ]
  })

  it('ForRoot & Register', () => {
    const A4ModuleClass = new A4ModuleBaseClassBuilder<A4ModuleClassCoreSchema, typeof options>(
      options
    ).withRegisterAndForRoot()

    // register function
    expect(A4ModuleClass.forRoot).toBeTruthy()
    expect(A4ModuleClass.forRootAsync).toBeTruthy()
    expect(A4ModuleClass.register).toBeTruthy()
    expect(A4ModuleClass.registerAsync).toBeTruthy()

    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    type cases = [
      Expect<
        Equal<
          typeof A4ModuleClass.forRoot,
          (options: IA4ModuleForRootOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,

      Expect<
        Equal<
          typeof A4ModuleClass.forRootAsync,
          (options: IA4ModuleForRootAsyncOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,

      Expect<
        Equal<
          typeof A4ModuleClass.register,
          (options: IA4ModuleRegisterOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,

      Expect<
        Equal<
          typeof A4ModuleClass.registerAsync,
          (options: IA4ModuleRegisterAsyncOptions<A4ModuleClassCoreSchema>) => DynamicModule
        >
      >,
    ]
  })

  const A4ModuleUnionClass = new A4ModuleBaseClassBuilder<A4ModuleClassCoreSchema, typeof options>(
    options
  ).withRegisterAndForRoot()

  /**
   *
   * 使用 register 注册模块。（强制局部注册）
   *
   * 仅支持通过 `moduleRef.get(A4ModuleUnionClass.SCOPE_PROVIDE_TOKEN)` 获取到实例。
   *
   */
  it('Ref - register', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [A4ModuleUnionClass.register(A4ModuleUnionClass.DEFAULT_CONFIG)],
    }).compile()

    expect(moduleRef.get(A4ModuleUnionClass.SCOPE_PROVIDE_TOKEN)).toBeInstanceOf(A4ModuleInstanceClass)

    expect(() => {
      moduleRef.get(A4ModuleInstanceClass)
    }).toThrow()
    expect(() => {
      moduleRef.get(A4ModuleUnionClass.GLOBAL_PROVIDE_TOKEN)
    }).toThrow()
  })

  /**
   *
   * 使用 forRoot 注册模块。（强制全局注册）
   *
   * 可支持通过 `moduleRef.get(A4ModuleUnionClass.GLOBAL_PROVIDE_TOKEN)` 获取到实例；
   * 可支持通过 `moduleRef.get(ProvideClass)` 获取到实例。
   *
   */
  it('Ref - forRoot', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [A4ModuleUnionClass.forRoot(A4ModuleUnionClass.DEFAULT_CONFIG)],
    }).compile()

    expect(moduleRef.get(A4ModuleUnionClass.GLOBAL_PROVIDE_TOKEN)).toBeInstanceOf(A4ModuleInstanceClass)
    expect(moduleRef.get(A4ModuleInstanceClass)).toBeInstanceOf(A4ModuleInstanceClass)

    expect(() => {
      moduleRef.get(A4ModuleUnionClass.SCOPE_PROVIDE_TOKEN)
    }).toThrow()
  })

  /**
   * 使用 registerAsync 和 forRootAsync 进行局部注册时。
   *
   * 可支持通过 `moduleRef.get(A4ModuleClass.SCOPE_PROVIDE_TOKEN)` 获取到实例；
   * 可支持通过 `moduleRef.get(ProvideClass)` 获取到实例。
   *
   */
  it.each([
    A4ModuleUnionClass.registerAsync({
      useFactory: () => A4ModuleUnionClass.DEFAULT_CONFIG,
    }),
    A4ModuleUnionClass.registerAsync({
      isGlobal: false,
      useFactory: () => A4ModuleUnionClass.DEFAULT_CONFIG,
    }),
    A4ModuleUnionClass.forRootAsync({
      isGlobal: false,
      useFactory: () => A4ModuleUnionClass.DEFAULT_CONFIG,
    }),
  ])('OK - registerAsync & forRoot - scope', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    expect(moduleRef.get(A4ModuleUnionClass.SCOPE_PROVIDE_TOKEN)).toBeInstanceOf(A4ModuleInstanceClass)
    expect(moduleRef.get(A4ModuleInstanceClass)).toBeInstanceOf(A4ModuleInstanceClass)

    expect(() => {
      moduleRef.get(A4ModuleUnionClass.GLOBAL_PROVIDE_TOKEN)
    }).toThrow()
  })

  /**
   * 使用 registerAsync 和 forRootAsync 进行全局注册时。
   *
   * 可支持通过 `moduleRef.get(A4ModuleClass.GLOBAL_PROVIDE_TOKEN)` 获取到实例；
   * 可支持通过 `moduleRef.get(ProvideClass)` 获取到实例。
   *
   */
  it.each([
    A4ModuleUnionClass.registerAsync({
      isGlobal: true,
      useFactory: () => A4ModuleUnionClass.DEFAULT_CONFIG,
    }),
    A4ModuleUnionClass.forRootAsync({
      useFactory: () => A4ModuleUnionClass.DEFAULT_CONFIG,
    }),
    A4ModuleUnionClass.forRootAsync({
      isGlobal: true,
      useFactory: () => A4ModuleUnionClass.DEFAULT_CONFIG,
    }),
  ])('OK - registerAsync & forRoot - scope', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    expect(moduleRef.get(A4ModuleUnionClass.GLOBAL_PROVIDE_TOKEN)).toBeInstanceOf(A4ModuleInstanceClass)
    expect(moduleRef.get(A4ModuleInstanceClass)).toBeInstanceOf(A4ModuleInstanceClass)

    expect(() => {
      moduleRef.get(A4ModuleUnionClass.SCOPE_PROVIDE_TOKEN)
    }).toThrow()
  })

  it('OK - getConfig', async () => {
    class MockA4Config {
      public getOrThrow(configPath: string): A4ModuleClassCoreSchema {
        return get(CU.p2CwD(A4ModuleClassSchema, {}), configPath)
      }
    }

    const exceptConfig = A4ModuleUnionClass.getConfig(new MockA4Config() as unknown as IA4Config<A4ModuleClassSchema>)
    expect(exceptConfig).toEqual(CU.p2CwD(A4ModuleClassCoreSchema, {}))
  })

  it('Error : getConfig', async () => {
    expect(() => {
      A4ModuleUnionClass.getConfig({} as IA4Config<A4ModuleClassSchema>)
    }).toThrow(new Error('a4Config.getOrThrow is not a function'))
  })
})
