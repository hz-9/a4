/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import {
  CU,
  GLOBAL_PROVIDE_TOKEN_A4_NETWORK,
  IA4Config,
  MODULE_CONFIG_PATH_A4_NETWORK,
  SCOPE_PROVIDE_TOKEN_A4_NETWORK,
} from '@hz-9/a4-core'
import { get } from '@hz-9/a4-core/lodash'
import { DynamicModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import { NETWORK_MODULE_DEFAULT } from '../const'
import { A4Network, A4NetworkModule, A4NetworkModuleSchema, A4NetworkModuleSchemaA } from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4NetworkModule.GLOBAL_PROVIDE_TOKEN).toBe(GLOBAL_PROVIDE_TOKEN_A4_NETWORK)
    expect(A4NetworkModule.SCOPE_PROVIDE_TOKEN).toBe(SCOPE_PROVIDE_TOKEN_A4_NETWORK)
    expect(A4NetworkModule.CONFIG_PATH).toBe(MODULE_CONFIG_PATH_A4_NETWORK)
    expect(A4NetworkModule.Schema).toBe(A4NetworkModuleSchemaA)
    expect(A4NetworkModule.CoreSchema).toBe(A4NetworkModuleSchema)
  })

  it.each([
    [
      'register',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4NetworkModule.register(A4NetworkModule.DEFAULT_CONFIG)],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.SCOPE_PROVIDE_TOKEN)
        return a4Network
      },
    ],
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4NetworkModule.forRoot(A4NetworkModule.DEFAULT_CONFIG)],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.GLOBAL_PROVIDE_TOKEN)
        return a4Network
      },
    ],
    [
      'registerAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4NetworkModule.registerAsync({
              useFactory: () => A4NetworkModule.DEFAULT_CONFIG,
            }),
          ],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.SCOPE_PROVIDE_TOKEN)
        return a4Network
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4NetworkModule.forRootAsync({
              useFactory: () => A4NetworkModule.DEFAULT_CONFIG,
            }),
          ],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.GLOBAL_PROVIDE_TOKEN)
        return a4Network
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4Network>) => {
    const a4Network: A4Network = await fun()
    expect(a4Network).toBeInstanceOf(A4Network)

    const addressInfo = a4Network.getAddressInfo()
    const hostAndPort = a4Network.getHostAndPort()

    const { DEFAULT_CONFIG } = A4NetworkModule
    expect(addressInfo.port).toBe(-1)
    expect(addressInfo.bindIPv4).toBe(DEFAULT_CONFIG.bindIPv4)
    expect(addressInfo.bindIPv6).toBe(DEFAULT_CONFIG.bindIPv6)
    expect(addressInfo.bindIPv4).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV4)
    expect(addressInfo.bindIPv6).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV6)
    expect(Array.isArray(addressInfo.ipv4)).toBe(true)
    expect(Array.isArray(addressInfo.ipv6)).toBe(true)

    expect(hostAndPort.host).toBe(addressInfo.ipv4[0])
    expect(hostAndPort.port).toBe(-1)

    a4Network.currentPort = 1234
    expect(a4Network.currentPort).toBe(1234)
  })
})
