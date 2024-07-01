/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import { DynamicModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ClassConstructor } from 'class-transformer'
import 'reflect-metadata'

import {
  CU,
  GLOBAL_PROVIDE_TOKEN_A4_LOG,
  IA4Config,
  MODULE_CONFIG_PATH_A4_LOG,
  SCOPE_PROVIDE_TOKEN_A4_LOG,
} from '@hz-9/a4-core'
import { get } from '@hz-9/a4-core/lodash'

import {
  A4Log4jsLogger,
  A4Log4jsSimpleLogModule,
  A4Log4jsSimpleLogModuleSchema,
  A4Log4jsSimpleLogModuleSchemaA,
} from '../index'

/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any */

describe.each([[A4Log4jsSimpleLogModule, A4Log4jsSimpleLogModuleSchema, A4Log4jsSimpleLogModuleSchemaA]])(
  'Module register.',
  (LogModule: typeof A4Log4jsSimpleLogModule, Schema: ClassConstructor<any>, RootSchema: ClassConstructor<any>) => {
    it('OK : BASE', async () => {
      expect(LogModule.globalProvideToken).toBe(GLOBAL_PROVIDE_TOKEN_A4_LOG)
      expect(LogModule.scopeProvideToken).toBe(SCOPE_PROVIDE_TOKEN_A4_LOG)
      expect(LogModule.configPath).toBe(MODULE_CONFIG_PATH_A4_LOG('log4js'))
      expect(LogModule.Schema).toBe(Schema)
      expect(LogModule.RootSchema).toBe(RootSchema)
    })

    it('Error : register & registerAsync', async () => {
      // @ts-expect-error
      // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
      typeof LogModule.register

      // @ts-expect-error
      // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
      typeof LogModule.registerAsync
    })

    it('OK : forRoot', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [LogModule.forRoot(LogModule.defaultConfig)],
      }).compile()

      const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.globalProvideToken)
      const a4Logger2: A4Log4jsLogger = moduleRef.get(A4Log4jsLogger)

      expect(() => {
        moduleRef.get(LogModule.scopeProvideToken)
      }).toThrow()
      expect(a4Logger).toBeInstanceOf(A4Log4jsLogger)
      expect(a4Logger2).toBeInstanceOf(A4Log4jsLogger)
    })

    it.each([
      LogModule.forRootAsync({
        isGlobal: false,
        useFactory: () => LogModule.defaultConfig,
      }),
    ])('OK - forRoot - scope', async (dynamicModule: DynamicModule) => {
      const moduleRef = await Test.createTestingModule({
        imports: [dynamicModule],
      }).compile()

      const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.scopeProvideToken)
      const a4Logger2: A4Log4jsLogger = moduleRef.get(A4Log4jsLogger)
      expect(() => {
        moduleRef.get(LogModule.globalProvideToken)
      }).toThrow()
      expect(a4Logger).toBeInstanceOf(A4Log4jsLogger)
      expect(a4Logger).toBe(a4Logger2)
    })

    it('OK - forRootAsync', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          LogModule.forRootAsync({
            useFactory: () => LogModule.defaultConfig,
          }),
        ],
      }).compile()

      const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.globalProvideToken)
      const a4Logger2: A4Log4jsLogger = moduleRef.get(A4Log4jsLogger)
      expect(() => {
        moduleRef.get(LogModule.scopeProvideToken)
      }).toThrow()
      expect(a4Logger).toBeInstanceOf(A4Log4jsLogger)
      expect(a4Logger).toBe(a4Logger2)
    })

    it.each([
      LogModule.forRootAsync({
        useFactory: () => LogModule.defaultConfig,
      }),
      LogModule.forRootAsync({
        isGlobal: true,
        useFactory: () => LogModule.defaultConfig,
      }),
    ])('OK - forRoot - global', async (dynamicModule: DynamicModule) => {
      const moduleRef = await Test.createTestingModule({
        imports: [dynamicModule],
      }).compile()

      const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.globalProvideToken)
      const a4Logger2: A4Log4jsLogger = moduleRef.get(A4Log4jsLogger)
      expect(() => {
        moduleRef.get(LogModule.scopeProvideToken)
      }).toThrow()
      expect(a4Logger).toBeInstanceOf(A4Log4jsLogger)
      expect(a4Logger).toBe(a4Logger2)
    })

    it.each([
      [
        'forRoot',
        async () => {
          const moduleRef = await Test.createTestingModule({
            imports: [LogModule.forRoot(LogModule.defaultConfig)],
          }).compile()
          const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.globalProvideToken)
          return a4Logger
        },
      ],
      [
        'forRootAsync',
        async () => {
          const moduleRef = await Test.createTestingModule({
            imports: [
              LogModule.forRootAsync({
                useFactory: () => LogModule.defaultConfig,
              }),
            ],
          }).compile()
          const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.globalProvideToken)
          return a4Logger
        },
      ],
    ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4Log4jsLogger>) => {
      const a4Logger: A4Log4jsLogger = await fun()
      expect(a4Logger).toBeInstanceOf(A4Log4jsLogger)
      a4Logger.log('This is A4 Logger.')
      expect(a4Logger.getTimestamp()).toBeTruthy()
    })

    it('OK - GetConfig', async () => {
      const options = LogModule.optionsToConfig(CU.p2CwD(Schema, {}))

      class MockA4Config {
        public getOrThrow(configPath: string): typeof Schema {
          return get(CU.p2CwD(RootSchema, {}), configPath)
        }
      }
      const exceptConfig = LogModule.getConfig(
        new MockA4Config() as unknown as IA4Config<A4Log4jsSimpleLogModuleSchemaA>
      )

      expect(JSON.stringify(exceptConfig)).toBe(JSON.stringify(options))
    })
  }
)
