/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
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
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import { A4Safe, A4SafeModule, A4SafeModuleSchema, A4SafeModuleSchemaA } from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4SafeModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_SAFE)
    expect(A4SafeModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_SAFE)
    expect(A4SafeModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_SAFE)
    expect(A4SafeModule.Schema).toBe(A4SafeModuleSchemaA)
    expect(A4SafeModule.CoreSchema).toBe(A4SafeModuleSchema)
  })

  it.each([
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4SafeModule.forRoot(A4SafeModule.DEFAULT_OPTIONS)],
        }).compile()
        const app = moduleRef.createNestApplication()

        const a4Safe: A4Safe = moduleRef.get(A4SafeModule.GLOBAL_PROVIDE_TOKEN)
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
              useFactory: () => A4SafeModule.DEFAULT_OPTIONS,
            }),
          ],
        }).compile()
        const app = moduleRef.createNestApplication()

        const a4Safe: A4Safe = moduleRef.get(A4SafeModule.GLOBAL_PROVIDE_TOKEN)
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
