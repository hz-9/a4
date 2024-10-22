/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 22:54:42
 */
import {
  GLOBAL_PROVIDE_TOKEN_A4_CONFIG,
  MODULE_CONFIG_PATH_A4_CONFIG,
  SCOPE_PROVIDE_TOKEN_A4_CONFIG,
} from '@hz-9/a4-core'
import { Test } from '@nestjs/testing'
import path from 'node:path'
import 'reflect-metadata'

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
    expect(A4ConfigModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_CONFIG)
    expect(A4ConfigModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_CONFIG)
    expect(A4ConfigModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_CONFIG)
    expect(A4ConfigModule.Schema).toBe(A4ConfigModuleSchemaA)
    expect(A4ConfigModule.CoreSchema).toBe(A4ConfigModuleSchema)
  })

  it.each([
    [
      'register',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4ConfigModule.register(defaultConfig)],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.SCOPE_PROVIDE_TOKEN)
        return a4Config
      },
    ],
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4ConfigModule.forRoot(defaultConfig)],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.GLOBAL_PROVIDE_TOKEN)
        return a4Config
      },
    ],
    [
      'registerAsync - isGlobal',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ConfigModule.registerAsync({
              isGlobal: true,
              useFactory: () => defaultConfig,
            }),
          ],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.GLOBAL_PROVIDE_TOKEN)
        return a4Config
      },
    ],
    [
      'registerAsync - noGlobal',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ConfigModule.registerAsync({
              isGlobal: false,
              useFactory: () => defaultConfig,
            }),
          ],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.SCOPE_PROVIDE_TOKEN)
        return a4Config
      },
    ],
    [
      'forRootAsync - isGlobal',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ConfigModule.forRootAsync({
              isGlobal: true,
              useFactory: () => defaultConfig,
            }),
          ],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.GLOBAL_PROVIDE_TOKEN)
        return a4Config
      },
    ],
    [
      'forRootAsync - noGlobal',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4ConfigModule.forRootAsync({
              isGlobal: false,
              useFactory: () => defaultConfig,
            }),
          ],
        }).compile()
        const a4Config: A4Config = moduleRef.get(A4ConfigModule.SCOPE_PROVIDE_TOKEN)
        return a4Config
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4Config>) => {
    const a4Config: A4Config = await fun()
    expect(a4Config).toBeInstanceOf(A4Config)
    expect(a4Config.config).toEqual({})
  })
})
