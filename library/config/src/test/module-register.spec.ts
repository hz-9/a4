/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:11:47
 */
import type { DynamicModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import path from 'node:path'
import 'reflect-metadata'

import {
  GLOBAL_PROVIDE_TOKEN_A4_CONFIG,
  IA4Config,
  MODULE_CONFIG_PATH_A4_CONFIG,
  SCOPE_PROVIDE_TOKEN_A4_CONFIG,
} from '@hz-9/a4-core'

import {
  A4Config,
  A4ConfigModule,
  A4ConfigModuleSchema,
  A4ConfigModuleSchemaA,
  type IA4ConfigModuleOptions,
} from '../index'

const defaultConfig: IA4ConfigModuleOptions = {
  ignoreSchema: true,
  rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
  configFile: 'a4-empty.yml',
}

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4ConfigModule.globalProvideToken).toBe(GLOBAL_PROVIDE_TOKEN_A4_CONFIG)
    expect(A4ConfigModule.scopeProvideToken).toBe(SCOPE_PROVIDE_TOKEN_A4_CONFIG)
    expect(A4ConfigModule.configPath).toBe(MODULE_CONFIG_PATH_A4_CONFIG)
    expect(A4ConfigModule.Schema).toBe(A4ConfigModuleSchema)
    expect(A4ConfigModule.RootSchema).toBe(A4ConfigModuleSchemaA)
  })

  it('OK - register', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.register({
          ignoreSchema: true,
          rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
          configFile: 'a4-empty.yml',
        }),
      ],
    }).compile()

    const a4Config: A4Config = moduleRef.get(A4ConfigModule.scopeProvideToken)
    expect(() => {
      moduleRef.get(A4Config)
    }).toThrow()
    expect(() => {
      moduleRef.get(A4ConfigModule.globalProvideToken)
    }).toThrow()
    expect(a4Config).toBeInstanceOf(A4Config)
  })

  it('OK - forRoot', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [A4ConfigModule.forRoot(defaultConfig)],
    }).compile()

    const a4Config: A4Config = moduleRef.get(A4ConfigModule.globalProvideToken)
    const a4Config2: A4Config = moduleRef.get(A4Config)
    expect(() => {
      moduleRef.get(A4ConfigModule.scopeProvideToken)
    }).toThrow()
    expect(a4Config).toBeInstanceOf(A4Config)
    expect(a4Config).toBe(a4Config2)
  })

  it.each([
    A4ConfigModule.registerAsync({
      useFactory: () => defaultConfig,
    }),
    A4ConfigModule.registerAsync({
      isGlobal: false,
      useFactory: () => defaultConfig,
    }),
    A4ConfigModule.forRootAsync({
      isGlobal: false,
      useFactory: () => defaultConfig,
    }),
  ])('OK - registerAsync & forRoot - scope', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    const a4Config: A4Config = moduleRef.get(A4ConfigModule.scopeProvideToken)
    const a4Config2: A4Config = moduleRef.get(A4Config)
    expect(() => {
      moduleRef.get(A4ConfigModule.globalProvideToken)
    }).toThrow()
    expect(a4Config).toBeInstanceOf(A4Config)
    expect(a4Config).toBe(a4Config2)
  })

  it.each([
    A4ConfigModule.registerAsync({
      isGlobal: true,
      useFactory: () => defaultConfig,
    }),
    A4ConfigModule.forRootAsync({
      useFactory: () => defaultConfig,
    }),
    A4ConfigModule.forRootAsync({
      isGlobal: true,
      useFactory: () => defaultConfig,
    }),
  ])('OK - registerAsync & forRoot - global', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    const a4Config: A4Config = moduleRef.get(A4ConfigModule.globalProvideToken)
    const a4Config2: A4Config = moduleRef.get(A4Config)
    expect(() => {
      moduleRef.get(A4ConfigModule.scopeProvideToken)
    }).toThrow()
    expect(a4Config).toBeInstanceOf(A4Config)
    expect(a4Config).toBe(a4Config2)
  })

  it('OK - forRootAsync', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          useFactory: () => defaultConfig,
        }),
      ],
    }).compile()

    const a4Config: A4Config = moduleRef.get(A4ConfigModule.globalProvideToken)
    const a4Config2: A4Config = moduleRef.get(A4Config)
    expect(() => {
      moduleRef.get(A4ConfigModule.scopeProvideToken)
    }).toThrow()
    expect(a4Config).toBeInstanceOf(A4Config)
    expect(a4Config).toBe(a4Config2)
  })

  it.each([
    [
      'register',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4ConfigModule.register(defaultConfig)],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.scopeProvideToken)
        return a4Config
      },
    ],
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4ConfigModule.forRoot(defaultConfig)],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.globalProvideToken)
        return a4Config
      },
    ],
    [
      'registerAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ConfigModule.registerAsync({
              useFactory: () => defaultConfig,
            }),
          ],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.scopeProvideToken)
        return a4Config
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ConfigModule.forRootAsync({
              useFactory: () => defaultConfig,
            }),
          ],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.globalProvideToken)
        return a4Config
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4Config>) => {
    const a4Config: A4Config = await fun()
    expect(a4Config).toBeInstanceOf(A4Config)
    expect(a4Config.config).toEqual({})
  })

  it('Error : getConfig', async () => {
    // const exceptConfig = A4ConfigModule.getConfig({} as IA4Config)
    expect(() => {
      A4ConfigModule.getConfig({} as IA4Config)
    }).toThrow(new Error('Method not implemented.'))
  })
})
