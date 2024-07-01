/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 01:13:52
 */
import 'reflect-metadata'

import { ClassValidatorUtil } from '@hz-9/a4-core'

import { NETWORK_MODULE_DEFAULT } from '../const'
import { A4NetworkModuleSchema, A4NetworkModuleSchemaA, A4NetworkModuleSchemaB } from '../schema'

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('Schema to options.', () => {
  it.each([{}, { A3: {} }, { A4: {} }, { A4: { x: 1 } }])('OK - Empty A', async (item) => {
    const options = ClassValidatorUtil.p2CwD(A4NetworkModuleSchemaA, item)

    expect(options.A4.network.bindIPv4).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV4)
    expect(options.A4.network.bindIPv6).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV6)
    expect(options.A4.network.portBaseline).toBe(NETWORK_MODULE_DEFAULT.PORT_BASELINE)
    expect(options.A4.network.forcePort).toBeUndefined()
  })

  it.each([{}, { network: {} }, { network: {} }, { network: { x: 1 } }])('OK - Empty B', async (item) => {
    const options = ClassValidatorUtil.p2CwD(A4NetworkModuleSchemaB, item)

    expect(options.network.bindIPv4).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV4)
    expect(options.network.bindIPv6).toBe(NETWORK_MODULE_DEFAULT.BIND_IPV6)
    expect(options.network.portBaseline).toBe(NETWORK_MODULE_DEFAULT.PORT_BASELINE)
    expect(options.network.forcePort).toBeUndefined()
  })

  it('OK - Empty C', async () => {
    const options = ClassValidatorUtil.p2CwD(A4NetworkModuleSchema, {
      bindIPv4: !NETWORK_MODULE_DEFAULT.BIND_IPV4,
      bindIPv6: !NETWORK_MODULE_DEFAULT.BIND_IPV6,
      portBaseline: NETWORK_MODULE_DEFAULT.PORT_BASELINE + 111,
      forcePort: 5678,
    })

    expect(options.bindIPv4).toBe(!NETWORK_MODULE_DEFAULT.BIND_IPV4)
    expect(options.bindIPv6).toBe(!NETWORK_MODULE_DEFAULT.BIND_IPV6)
    expect(options.portBaseline).toBe(NETWORK_MODULE_DEFAULT.PORT_BASELINE + 111)
    expect(options.forcePort).toBe(5678)
  })
})
