/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import {
  GLOBAL_PROVIDE_TOKEN_A4_MICRO_SERVICE,
  MODULE_CONFIG_PATH_A4_MICRO_SERVICE,
  SCOPE_PROVIDE_TOKEN_A4_MICRO_SERVICE,
} from '@hz-9/a4-core'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import { A4MicroService, A4MicroServiceModule, A4MicroServiceModuleSchema, A4MicroServiceModuleSchemaA } from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4MicroServiceModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_MICRO_SERVICE)
    expect(A4MicroServiceModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_MICRO_SERVICE)
    expect(A4MicroServiceModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_MICRO_SERVICE)
    expect(A4MicroServiceModule.Schema).toBe(A4MicroServiceModuleSchemaA)
    expect(A4MicroServiceModule.CoreSchema).toBe(A4MicroServiceModuleSchema)
  })

  it.each([
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4MicroServiceModule.forRoot(A4MicroServiceModule.DEFAULT_OPTIONS)],
        }).compile()
        // const app = moduleRef.createNestApplication()

        const a4MicroService: A4MicroService = moduleRef.get(A4MicroServiceModule.GLOBAL_PROVIDE_TOKEN)
        return a4MicroService
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4MicroServiceModule.forRootAsync({
              useFactory: () => A4MicroServiceModule.DEFAULT_OPTIONS,
            }),
          ],
        }).compile()
        // const app = moduleRef.createNestApplication()

        const a4MicroService: A4MicroService = moduleRef.get(A4MicroServiceModule.GLOBAL_PROVIDE_TOKEN)
        return a4MicroService
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4MicroService>) => {
    const a4MicroService: A4MicroService = await fun()
    expect(a4MicroService).toBeInstanceOf(A4MicroService)
  })
})
