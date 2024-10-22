/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
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
    it('OK: get Init Logger', async () => {
      const logger = LogModule.getInitLogger()
      expect(logger).toBeInstanceOf(A4Log4jsLogger)
    })

    it('OK : forRoot', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [LogModule.forRoot(LogModule.defaultOptions)],
      }).compile()

      const app = moduleRef.createNestApplication({
        // logger: LogModule.getInitLogger(),
      })

      app.useLogger(LogModule.getInitLogger())

      await app.init()

      const a4Logger: A4Log4jsLogger = moduleRef.get(LogModule.GLOBAL_PROVIDE_TOKEN)
      const a4Logger2: A4Log4jsLogger = moduleRef.get(A4Log4jsLogger)

      expect(() => {
        moduleRef.get(LogModule.SCOPE_PROVIDE_TOKEN)
      }).toThrow()
      expect(a4Logger).toBeInstanceOf(A4Log4jsLogger)
      expect(a4Logger2).toBeInstanceOf(A4Log4jsLogger)
    })
  }
)
