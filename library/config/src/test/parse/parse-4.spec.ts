/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:10:22
 */
import 'reflect-metadata'

import { ClassValidatorUtil } from '@hz-9/a4-core'

import * as Parse1 from './parse-4.dto'
import { anyToRegExpString } from '../util'

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('Config Parse - 4', () => {
  it('OK   : no db', async () => {
    const config = ClassValidatorUtil.parse(Parse1.AppConfigDto, {
      A4: {
        NODE_ENV: 'test',
        tempDir: './temp-dir',

        dbTypeORM: {
          postgresql: {
            default: {
              host: '127.0.0.1',
              port: '5432',
            },
          },
        },
      },
    })

    expect(config.A4.NODE_ENV).toBe('test')
    expect(config.A4.dbTypeORM.postgresql?.default).toEqual({ host: '127.0.0.1', port: '5432' })
  })

  it.each([123, true, false, [1, 2, 3], null, undefined])(
    'Error: `dbTypeOrm` must be a object. - %s',
    async (value: unknown) => {
      const r = (): void => {
        ClassValidatorUtil.parse(
          Parse1.AppConfigDto,
          {
            A4: {
              NODE_ENV: 'development',

              dbTypeORM: value,
            },
          },
          { errorColer: false }
        )
      }

      const r1 = `- config A4.dbTypeORM does not match the following rules`
      const r2 = `- isObject: dbTypeORM must be an object, current config is \`${anyToRegExpString(value)}\``

      const rules = [r1, r2]

      rules.forEach((rule) => {
        expect(r).toThrowError(new RegExp(rule))
      })
    }
  )

  it.each([123, true, false, [1, 2, 3], null])('Error: `postgresql` must be a object. - %s', async (value: unknown) => {
    const r = (): void => {
      ClassValidatorUtil.parse(
        Parse1.AppConfigDto,
        {
          A4: {
            NODE_ENV: 'development',

            dbTypeORM: {
              postgresql: value,
            },
          },
        },
        { errorColer: false }
      )
    }

    const r1 = `- config A4.dbTypeORM.postgresql does not match the following rules`
    const r2 = `- isObject: postgresql must be an object, current config is \`${anyToRegExpString(value)}\``

    const rules = [r1, r2]

    rules.forEach((rule) => {
      expect(r).toThrowError(new RegExp(rule))
    })
  })

  it('Error: `postgresql` is an undefined.', async () => {
    ClassValidatorUtil.parse(
      Parse1.AppConfigDto,
      {
        A4: {
          NODE_ENV: 'development',

          dbTypeORM: {
            postgresql: undefined,
          },
        },
      },
      { errorColer: false }
    )
  })
})
