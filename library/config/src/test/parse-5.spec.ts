/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 00:52:53
 */
import 'reflect-metadata'

import { ClassValidatorUtil } from '@hz-9/a4-core'

import * as Parse1 from './parse-5.dto'
import { anyToRegExpString } from './util'

/* eslint-disable @rushstack/security/no-unsafe-regexp */

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('Config Parse - 5', () => {
  it.each([{}, { host: { bindIpv4: true } }, { port: { baseline: 16100 } }, { port: { forcePort: undefined } }])(
    'OK   : no set',
    async (value: object) => {
      const config = ClassValidatorUtil.parse(Parse1.AppConfigDto, {
        A4: { network: value },
      })

      expect(config.A4.network.host.bindIpv4).toBe(true)
      expect(config.A4.network.host.bindIpv6).toBe(false)
      expect(config.A4.network.port.baseline).toBe(16100)
      expect(config.A4.network.port.forcePort).toBe(undefined)
    }
  )

  it('OK   : set A4.network.host', async () => {
    const config = ClassValidatorUtil.parse(Parse1.AppConfigDto, {
      A4: {
        network: {
          host: { bindIpv4: false, bindIpv6: true },
        },
      },
    })

    expect(config.A4.network.host.bindIpv4).toBe(false)
    expect(config.A4.network.host.bindIpv6).toBe(true)
    expect(config.A4.network.port.baseline).toBe(16100)
    expect(config.A4.network.port.forcePort).toBe(undefined)
  })

  it('OK   : set network.network.port', async () => {
    const config = ClassValidatorUtil.parse(Parse1.AppConfigDto, {
      A4: {
        network: {
          port: { baseline: 17100, forcePort: 3001 },
        },
      },
    })

    expect(config.A4.network.host.bindIpv4).toBe(true)
    expect(config.A4.network.host.bindIpv6).toBe(false)
    expect(config.A4.network.port.baseline).toBe(17100)
    expect(config.A4.network.port.forcePort).toBe(3001)
  })

  it.each([123, true, false, [1, 2, 3], null])('Error: `port` must be a object. - %s', async (value: unknown) => {
    const r = (): void => {
      ClassValidatorUtil.parse(
        Parse1.AppConfigDto,
        {
          A4: {
            network: {
              port: value,
            },
          },
        },
        { errorColer: false }
      )
    }

    const r1 = `- config.A4.network.port does not match the following rules`
    const r2 = `- isObject: port must be an object, current config is \`${anyToRegExpString(value)}\``

    const rules = [r1, r2]

    rules.forEach((rule) => {
      expect(r).toThrowError(new RegExp(rule))
    })
  })
})
