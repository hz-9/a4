/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import {
  CU,
  GLOBAL_PROVIDE_TOKEN_A4_LOG,
  IA4Config,
  MODULE_CONFIG_PATH_A4_LOG,
  SCOPE_PROVIDE_TOKEN_A4_LOG,
} from '@hz-9/a4-core'
import { get } from '@hz-9/a4-core/lodash'
import { Test } from '@nestjs/testing'
import { ClassConstructor } from 'class-transformer'
import 'reflect-metadata'

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
      expect(LogModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_LOG)
      expect(LogModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_LOG)
      expect(LogModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_LOG('log4js'))
      expect(LogModule.Schema).toBe(RootSchema)
      expect(LogModule.CoreSchema).toBe(Schema)
    })

    it.each([
      [
        'forRoot',
        async () => {
          const moduleRef = await Test.createTestingModule({
            imports: [LogModule.forRoot(LogModule.defaultOptions)],
          }).compile()
          const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.GLOBAL_PROVIDE_TOKEN)
          return a4Logger
        },
      ],
      [
        'forRootAsync',
        async () => {
          const moduleRef = await Test.createTestingModule({
            imports: [
              LogModule.forRootAsync({
                useFactory: () => LogModule.defaultOptions,
              }),
            ],
          }).compile()
          const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.GLOBAL_PROVIDE_TOKEN)
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
      const options = CU.p2CwD(Schema, {})

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
