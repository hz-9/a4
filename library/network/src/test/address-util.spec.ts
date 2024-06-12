/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:40:37
 */
import 'reflect-metadata'

import { ClassValidatorUtil } from '@hz-9/a4-core'

import { NetworkFamily } from '../enum'
import { Address } from '../plugin/address'
import { A4NetworkModuleSchema } from '../schema'

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('Address Util', () => {
  it('OK - Default', async () => {
    const address = await Address.getDefaultInterface()

    expect(address).toBeTruthy()
  })

  it('OK - IPv4', async () => {
    const address0 = await Address.getDefaultInterface()
    const address1 = await Address.getDefaultInterface(NetworkFamily.IPv4)

    expect(address0).toEqual(address1)
    if (address1) expect(address1.family).toBe(NetworkFamily.IPv4)
  })

  it('OK - IPv6', async () => {
    const address1 = await Address.getDefaultInterface(NetworkFamily.IPv6)
    if (address1) expect(address1.family).toBe(NetworkFamily.IPv6)
  })

  it('OK - IPv4 List', async () => {
    const list0 = await Address.getInterfaceList()
    const list1 = await Address.getInterfaceList(NetworkFamily.IPv4)

    expect(list0).toEqual(list1)
  })

  it('OK - IPv6 List', async () => {
    const list1 = await Address.getInterfaceList(NetworkFamily.IPv6)

    if (list1.length) expect(list1[0].family).toBe(NetworkFamily.IPv6)
  })

  it('OK   : use Default', async () => {
    const defaultOptions = ClassValidatorUtil.p2CwD(A4NetworkModuleSchema, {})
    const networkInfo = await Address.getNetWorkInfo(defaultOptions)

    expect(networkInfo.bindIPv4).toBe(true)
    expect(networkInfo.bindIPv6).toBe(false)
  })

  it('Bind IPv6', async () => {
    const defaultOptions = ClassValidatorUtil.p2CwD(A4NetworkModuleSchema, { bindIPv6: true })
    const networkInfo = await Address.getNetWorkInfo(defaultOptions)

    expect(networkInfo.bindIPv4).toBe(true)
    expect(networkInfo.bindIPv6).toBe(true)
  })
})
