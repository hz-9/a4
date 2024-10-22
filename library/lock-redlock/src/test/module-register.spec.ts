/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import { GLOBAL_PROVIDE_TOKEN_A4_LOCK, MODULE_CONFIG_PATH_A4_LOCK, SCOPE_PROVIDE_TOKEN_A4_LOCK } from '@hz-9/a4-core'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import { A4RedLockModule, A4RedLockModuleSchema, A4RedLockModuleSchemaA, Redlock } from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4RedLockModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_LOCK)
    expect(A4RedLockModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_LOCK)
    expect(A4RedLockModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_LOCK('log4js'))
    expect(A4RedLockModule.Schema).toBe(A4RedLockModuleSchemaA)
    expect(A4RedLockModule.CoreSchema).toBe(A4RedLockModuleSchema)
  })

  it.each([
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4RedLockModule.forRoot({
              ...A4RedLockModule.DEFAULT_OPTIONS,

              // 并不进行连接操作。
              connect: {
                host: '127.0.0.1',
                port: 6380,
                password: 'A1345678',
                db: 0,
              },
            }),
          ],
        }).compile()
        const a4RedLock: Redlock = moduleRef.get(A4RedLockModule.GLOBAL_PROVIDE_TOKEN)
        return a4RedLock
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4RedLockModule.forRootAsync({
              useFactory: () => ({
                ...A4RedLockModule.DEFAULT_OPTIONS,

                // 并不进行连接操作。
                connect: {
                  host: '127.0.0.1',
                  port: 6380,
                  password: 'A1345678',
                  db: 0,
                },
              }),
            }),
          ],
        }).compile()
        const a4RedLock: Redlock = moduleRef.get(A4RedLockModule.GLOBAL_PROVIDE_TOKEN)
        return a4RedLock
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<Redlock>) => {
    const a4RedLock: Redlock = await fun()

    expect(a4RedLock.clients.size).toBe(1)
    expect(a4RedLock).toBeInstanceOf(Redlock)
  })
})
