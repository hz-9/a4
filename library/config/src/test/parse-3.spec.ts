/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 00:52:24
 */
import 'reflect-metadata'

import { ClassValidatorUtil } from '@hz-9/a4-core'

import * as Parse1 from './parse-3.dto'
import { anyToRegExpString } from './util'

/* eslint-disable @rushstack/security/no-unsafe-regexp */

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('Config Parse - 3', () => {
  it('OK   : use Default', async () => {
    const config = ClassValidatorUtil.parse(Parse1.AppConfigDto, {
      A4: {
        NODE_ENV: 'test',
        tempDir: './temp-dir',
      },
    })

    expect(config.A4.NODE_ENV).toBe('test')
    expect(config.A4.tempDir).toBe('./temp-dir')
  })

  it.each([undefined])('OK   : use Default - %s', async (value: unknown) => {
    const config = ClassValidatorUtil.parse(Parse1.AppConfigDto, {
      A4: {
        NODE_ENV: 'development',
        tempDir: value,
      },
    })

    expect(config.A4.NODE_ENV).toBe('development')
    expect(config.A4.tempDir).toBe('./temp')
  })

  it.each([123, true, false, [1, 2, 3], null, undefined])(
    'Error: `A4` must be an object. - %s',
    async (value: unknown) => {
      const r = (): void => {
        ClassValidatorUtil.parse(
          Parse1.AppConfigDto,
          {
            A4: value,
          },

          { errorColer: false }
        )
      }

      /**
       *
       * XXX
       *
       * 当 value 为数组类型时，异常信息，会自动分为多级识别。
       * 异常信息断言不好处理，暂不处理。
       *
       * 当 value 为 undefined 时，不会出现 `nestedValidation` 的异常信息判断。
       *
       */
      const rules: string[] = []

      const r1 = `- config.A4 does not match the following rules`
      const r2 = `- isObject: A4 must be an object, current config is \`${anyToRegExpString(value)}\``
      const r3 = `nestedValidation: nested property A4 must be either object or array, current config is \`${anyToRegExpString(
        value
      )}\``
      if (value === undefined) {
        rules.push(r1, r2)
      } else if (Array.isArray(value)) {
        rules.push(r1, r2)
      } else {
        rules.push(r1, r2, r3)
      }

      rules.forEach((rule) => {
        expect(r).toThrowError(new RegExp(rule))
      })
    }
  )

  it.each([123, true, false, { a: 1, b: 2 }, [1, 2, 3], null, undefined])(
    'Error: `NODE_ENV` must be a string. - %s',
    async (value: unknown) => {
      const r = (): void => {
        ClassValidatorUtil.parse(
          Parse1.AppConfigDto,
          {
            A4: {
              NODE_ENV: value,
            },
          },
          { errorColer: false }
        )
      }

      const r1 = `- config.A4.NODE_ENV does not match the following rules`
      const r2 = `- isIn: NODE_ENV must be one of the following values: development, test, production, current config is \`${anyToRegExpString(
        value
      )}\``

      const rules = [r1, r2]

      rules.forEach((rule) => {
        expect(r).toThrowError(new RegExp(rule))
      })
    }
  )
})
