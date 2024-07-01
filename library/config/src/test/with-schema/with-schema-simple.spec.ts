/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-25 16:30:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:08:14
 */
import 'reflect-metadata'

import { A4ConfigModuleError } from '../../index'
import { diffLoad } from '../util'
import { AppSchema1, AppSchema2, AppSchema3 } from './with-schema-simple.dto'

describe('With schema demo - string boolean number.', () => {
  it('OK: Require - AppSchema1', async () => {
    const { config1, config2 } = await diffLoad(AppSchema1, 'with-schema-simple-ok.yml')
    expect(config1).toEqual(config2)
  })

  it('Error: Require - AppSchema1', async () => {
    const errorMsg: string[] = [
      'Configuration is not valid:',
      '  - config str does not match the following rules:',
      '    - isString: str must be a string, current config is `undefined`',
      '  - config isOpen does not match the following rules:',
      '    - isBoolean: isOpen must be a boolean value, current config is `undefined`',
      '  - config num does not match the following rules:',
      '    - isNumber: num must be a number conforming to the specified constraints, current config is `undefined`',
    ]

    await expect(diffLoad(AppSchema1, 'a4-empty.yml')).rejects.toThrow(new A4ConfigModuleError(errorMsg.join('\n')))
  })

  it('OK: With default - AppSchema2', async () => {
    const { config1, config2 } = await diffLoad(AppSchema2, 'a4-empty.yml')

    expect((config1 as AppSchema2).isOpen).toBe(true)
    expect((config1 as AppSchema2).str).toBe('Hello World')
    expect((config1 as AppSchema2).num).toBe(100)
    expect(config2).toEqual({})
  })

  it('OK: Partial - AppSchema3', async () => {
    const { config1, config2 } = await diffLoad(AppSchema3, 'a4-empty.yml')

    expect(config1).toEqual({})
    expect(config2).toEqual({})
  })
})
