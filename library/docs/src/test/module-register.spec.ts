/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import {
  A4Application,
  A4ConfigBase,
  CU,
  GLOBAL_PROVIDE_TOKEN_A4_DOCS,
  IA4Config,
  MODULE_CONFIG_PATH_A4_DOCS,
  SCOPE_PROVIDE_TOKEN_A4_DOCS,
} from '@hz-9/a4-core'
import { get } from '@hz-9/a4-core/lodash'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import { A4Docs, A4DocsModule, A4DocsModuleSchema, A4DocsModuleSchemaA } from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4DocsModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_DOCS)
    expect(A4DocsModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_DOCS)
    expect(A4DocsModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_DOCS)
    expect(A4DocsModule.Schema).toBe(A4DocsModuleSchemaA)
    expect(A4DocsModule.CoreSchema).toBe(A4DocsModuleSchema)
  })

  it.each([
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4DocsModule.forRoot(A4DocsModule.DEFAULT_OPTIONS)],
        }).compile()
        const app = moduleRef.createNestApplication()

        const a4Docs: A4Docs = moduleRef.get(A4DocsModule.GLOBAL_PROVIDE_TOKEN)
        await a4Docs.init(new A4Application(app as any, { isTest: true }))

        return a4Docs
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4DocsModule.forRootAsync({
              useFactory: () => A4DocsModule.DEFAULT_OPTIONS,
            }),
          ],
        }).compile()
        const app = moduleRef.createNestApplication()

        const a4Docs: A4Docs = moduleRef.get(A4DocsModule.GLOBAL_PROVIDE_TOKEN)
        await a4Docs.init(new A4Application(app as any, { isTest: true }))

        return a4Docs
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4Docs>) => {
    const a4Docs: A4Docs = await fun()
    expect(a4Docs).toBeInstanceOf(A4Docs)
    expect(a4Docs.getHomePageHtml()).toBeTruthy()
  })

  it('OK - getConfig', async () => {
    const a4ConfigBase = new A4ConfigBase()
    const options = {
      ...CU.p2CwD(A4DocsModuleSchema, {}),

      statsInfo: a4ConfigBase.getA4StatsInfo(),
      pathInfo: a4ConfigBase.getA4PathInfo(),
    }

    class MockA4Config extends A4ConfigBase {
      // @ts-ignore
      public getOrThrow(configPath: string): A4DocsModuleSchema {
        return get(CU.p2CwD(A4DocsModuleSchemaA, {}), configPath)
      }
    }

    const exceptConfig = A4DocsModule.getOptions(new MockA4Config() as unknown as IA4Config<A4DocsModuleSchemaA>)

    const options1 = exceptConfig
    const options2 = options

    options1.statsInfo = {
      ...options1.statsInfo,
      upTime: 0,
      upTimeStr: '',
      initTime: 0,
      initTimeStr: '',
      currentTime: 0,
      currentTimeStr: '',
    }

    options2.statsInfo = {
      ...options2.statsInfo,
      upTime: 0,
      upTimeStr: '',
      initTime: 0,
      initTimeStr: '',
      currentTime: 0,
      currentTimeStr: '',
    }

    expect(options1).toEqual(options2)
  })
})
