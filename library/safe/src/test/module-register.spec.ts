/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import { DynamicModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import {
  A4Application,
  A4ConfigBase,
  CU,
  GLOBAL_PROVIDE_TOKEN_A4_SAFE,
  IA4Config,
  MODULE_CONFIG_PATH_A4_SAFE,
  SCOPE_PROVIDE_TOKEN_A4_SAFE,
} from '@hz-9/a4-core'
import { get } from '@hz-9/a4-core/lodash'

import { A4Safe, A4SafeModule, A4SafeModuleSchema, A4SafeModuleSchemaA } from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4SafeModule.globalProvideToken).toBe(GLOBAL_PROVIDE_TOKEN_A4_SAFE)
    expect(A4SafeModule.scopeProvideToken).toBe(SCOPE_PROVIDE_TOKEN_A4_SAFE)
    expect(A4SafeModule.configPath).toBe(MODULE_CONFIG_PATH_A4_SAFE)
    expect(A4SafeModule.Schema).toBe(A4SafeModuleSchema)
    expect(A4SafeModule.RootSchema).toBe(A4SafeModuleSchemaA)
  })

  it('OK - register', async () => {
    // @ts-expect-error
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    typeof A4SafeModule.register

    // @ts-expect-error
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    typeof A4SafeModule.registerAsync
  })

  it('OK - forRoot', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [A4SafeModule.forRoot(A4SafeModule.defaultConfig)],
    }).compile()

    const a4Safe: A4Safe = moduleRef.get(A4SafeModule.globalProvideToken)
    const a4Safe2: A4Safe = moduleRef.get(A4Safe)
    expect(() => {
      moduleRef.get(A4SafeModule.scopeProvideToken)
    }).toThrow()
    expect(a4Safe).toBeInstanceOf(A4Safe)
    expect(a4Safe).toBe(a4Safe2)
  })

  it.each([
    A4SafeModule.forRootAsync({
      isGlobal: false,
      useFactory: () => A4SafeModule.defaultConfig,
    }),
  ])('OK - registerAsync & forRoot - scope', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    const a4Safe: A4Safe = moduleRef.get(A4SafeModule.scopeProvideToken)
    const a4Safe2: A4Safe = moduleRef.get(A4Safe)
    expect(() => {
      moduleRef.get(A4SafeModule.globalProvideToken)
    }).toThrow()
    expect(a4Safe).toBeInstanceOf(A4Safe)
    expect(a4Safe).toBe(a4Safe2)
  })

  it.each([
    A4SafeModule.forRootAsync({
      useFactory: () => A4SafeModule.defaultConfig,
    }),
    A4SafeModule.forRootAsync({
      isGlobal: true,
      useFactory: () => A4SafeModule.defaultConfig,
    }),
  ])('OK - registerAsync & forRoot - global', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    const a4Safe: A4Safe = moduleRef.get(A4SafeModule.globalProvideToken)
    const a4Safe2: A4Safe = moduleRef.get(A4Safe)
    expect(() => {
      moduleRef.get(A4SafeModule.scopeProvideToken)
    }).toThrow()
    expect(a4Safe).toBeInstanceOf(A4Safe)
    expect(a4Safe).toBe(a4Safe2)
  })

  it('OK - forRootAsync', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4SafeModule.forRootAsync({
          useFactory: () => A4SafeModule.defaultConfig,
        }),
      ],
    }).compile()

    const a4Safe: A4Safe = moduleRef.get(A4SafeModule.globalProvideToken)
    const a4Safe2: A4Safe = moduleRef.get(A4Safe)
    expect(() => {
      moduleRef.get(A4SafeModule.scopeProvideToken)
    }).toThrow()
    expect(a4Safe).toBeInstanceOf(A4Safe)
    expect(a4Safe).toBe(a4Safe2)
  })

  it.each([
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4SafeModule.forRoot(A4SafeModule.defaultConfig)],
        }).compile()
        const app = moduleRef.createNestApplication()

        const a4Safe: A4Safe = moduleRef.get(A4SafeModule.globalProvideToken)
        await a4Safe.init(new A4Application(app as any, { isTest: true }))

        return a4Safe
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4SafeModule.forRootAsync({
              useFactory: () => A4SafeModule.defaultConfig,
            }),
          ],
        }).compile()
        const app = moduleRef.createNestApplication()

        const a4Safe: A4Safe = moduleRef.get(A4SafeModule.globalProvideToken)
        await a4Safe.init(new A4Application(app as any, { isTest: true }))

        return a4Safe
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4Safe>) => {
    const a4Safe: A4Safe = await fun()
    expect(a4Safe).toBeInstanceOf(A4Safe)
    // expect(a4Safe.getHomePageHtml()).toBeTruthy()
  })

  it('OK - getConfig', async () => {
    const options = CU.p2CwD(A4SafeModuleSchema, {})

    class MockA4Config extends A4ConfigBase {
      // @ts-ignore
      public getOrThrow(configPath: string): A4SafeModuleSchema {
        return get(CU.p2CwD(A4SafeModuleSchemaA, {}), configPath)
      }
    }

    const exceptConfig = A4SafeModule.getConfig(new MockA4Config() as unknown as IA4Config<A4SafeModuleSchemaA>)
    expect(exceptConfig).toEqual(options)
  })
})
