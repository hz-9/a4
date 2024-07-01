/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 */
import { DynamicModule } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import {
  CU,
  GLOBAL_PROVIDE_TOKEN_A4_NETWORK,
  IA4Config,
  MODULE_CONFIG_PATH_A4_NETWORK,
  SCOPE_PROVIDE_TOKEN_A4_NETWORK,
} from '@hz-9/a4-core'
import { get } from '@hz-9/a4-core/lodash'

import { NETWORK_MODULE_DEFAULT } from '../const'
import { A4Network, A4NetworkModule, A4NetworkModuleSchema, A4NetworkModuleSchemaA } from '../index'

describe('Module register.', () => {
  it('OK - BASE', async () => {
    expect(A4NetworkModule.globalProvideToken).toBe(GLOBAL_PROVIDE_TOKEN_A4_NETWORK)
    expect(A4NetworkModule.scopeProvideToken).toBe(SCOPE_PROVIDE_TOKEN_A4_NETWORK)
    expect(A4NetworkModule.configPath).toBe(MODULE_CONFIG_PATH_A4_NETWORK)
    expect(A4NetworkModule.Schema).toBe(A4NetworkModuleSchema)
    expect(A4NetworkModule.RootSchema).toBe(A4NetworkModuleSchemaA)
  })

  it('OK - register', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [A4NetworkModule.register(A4NetworkModule.defaultConfig)],
    }).compile()

    const a4Network: A4Network = moduleRef.get(A4NetworkModule.scopeProvideToken)
    expect(() => {
      moduleRef.get(A4Network)
    }).toThrow()
    expect(() => {
      moduleRef.get(A4NetworkModule.globalProvideToken)
    }).toThrow()
    expect(a4Network).toBeInstanceOf(A4Network)
  })

  it('OK - forRoot', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [A4NetworkModule.forRoot(A4NetworkModule.defaultConfig)],
    }).compile()

    const a4Network: A4Network = moduleRef.get(A4NetworkModule.globalProvideToken)
    const a4Network2: A4Network = moduleRef.get(A4Network)
    expect(() => {
      moduleRef.get(A4NetworkModule.scopeProvideToken)
    }).toThrow()
    expect(a4Network).toBeInstanceOf(A4Network)
    expect(a4Network).toBe(a4Network2)
  })

  it.each([
    A4NetworkModule.registerAsync({
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
    A4NetworkModule.registerAsync({
      isGlobal: false,
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
    A4NetworkModule.forRootAsync({
      isGlobal: false,
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
  ])('OK - registerAsync & forRoot - scope', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    const a4Network: A4Network = moduleRef.get(A4NetworkModule.scopeProvideToken)
    const a4Network2: A4Network = moduleRef.get(A4Network)
    expect(() => {
      moduleRef.get(A4NetworkModule.globalProvideToken)
    }).toThrow()
    expect(a4Network).toBeInstanceOf(A4Network)
    expect(a4Network).toBe(a4Network2)
  })

  it.each([
    A4NetworkModule.registerAsync({
      isGlobal: true,
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
    A4NetworkModule.forRootAsync({
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
    A4NetworkModule.forRootAsync({
      isGlobal: true,
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
  ])('OK - registerAsync & forRoot - global', async (dynamicModule: DynamicModule) => {
    const moduleRef = await Test.createTestingModule({
      imports: [dynamicModule],
    }).compile()

    const a4Network: A4Network = moduleRef.get(A4NetworkModule.globalProvideToken)
    const a4Network2: A4Network = moduleRef.get(A4Network)
    expect(() => {
      moduleRef.get(A4NetworkModule.scopeProvideToken)
    }).toThrow()
    expect(a4Network).toBeInstanceOf(A4Network)
    expect(a4Network).toBe(a4Network2)
  })

  it('OK - forRootAsync', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4NetworkModule.forRootAsync({
          useFactory: () => A4NetworkModule.defaultConfig,
        }),
      ],
    }).compile()

    const a4Network: A4Network = moduleRef.get(A4NetworkModule.globalProvideToken)
    const a4Network2: A4Network = moduleRef.get(A4Network)
    expect(() => {
      moduleRef.get(A4NetworkModule.scopeProvideToken)
    }).toThrow()
    expect(a4Network).toBeInstanceOf(A4Network)
    expect(a4Network).toBe(a4Network2)
  })

  it.each([
    [
      'register',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4NetworkModule.register(A4NetworkModule.defaultConfig)],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.scopeProvideToken)
        return a4Network
      },
    ],
    [
      'forRoot',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [A4NetworkModule.forRoot(A4NetworkModule.defaultConfig)],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.globalProvideToken)
        return a4Network
      },
    ],
    [
      'registerAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4NetworkModule.registerAsync({
              useFactory: () => A4NetworkModule.defaultConfig,
            }),
          ],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.scopeProvideToken)
        return a4Network
      },
    ],
    [
      'forRootAsync',
      async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            A4NetworkModule.forRootAsync({
              useFactory: () => A4NetworkModule.defaultConfig,
            }),
          ],
        }).compile()
        const a4Network: A4Network = moduleRef.get(A4NetworkModule.globalProvideToken)
        return a4Network
      },
    ],
  ])('OK - judge info - %s', async (funName: string, fun: () => Promise<A4Network>) => {
    const a4Network: A4Network = await fun()
    expect(a4Network).toBeInstanceOf(A4Network)

    const addressInfo = a4Network.getAddressInfo()
    const hostAndPort = a4Network.getHostAndPort()

    const { defaultConfig } = A4NetworkModule
    expect(addressInfo.port).toBe(-1)
    expect(addressInfo.bindIPv4).toBe(defaultConfig.bindIPv4)
    expect(addressInfo.bindIPv6).toBe(defaultConfig.bindIPv6)
    expect(addressInfo.bindIPv4).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV4)
    expect(addressInfo.bindIPv6).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV6)
    expect(Array.isArray(addressInfo.ipv4)).toBe(true)
    expect(Array.isArray(addressInfo.ipv6)).toBe(true)

    expect(hostAndPort.host).toBe(addressInfo.ipv4[0])
    expect(hostAndPort.port).toBe(-1)

    a4Network.currentPort = 1234
    expect(a4Network.currentPort).toBe(1234)
  })

  it('OK - getConfig', async () => {
    const options = CU.p2CwD(A4NetworkModuleSchema, {})
    class MockA4Config {
      public getOrThrow(configPath: string): A4NetworkModuleSchema {
        return get(CU.p2CwD(A4NetworkModuleSchemaA, {}), configPath)
      }
    }

    const exceptConfig = A4NetworkModule.getConfig(new MockA4Config() as unknown as IA4Config<A4NetworkModuleSchemaA>)

    expect(exceptConfig).toEqual(options)
  })
})
