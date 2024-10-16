/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-25 16:30:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:08:03
 */
import 'reflect-metadata'

import { A4ConfigModuleError } from '../../index'
import { diffLoad } from '../util'
import { AppSchema1, AppSchema2, AppSchema3 } from './with-schema-class.dto'

describe('With schema demo - class.', () => {
  it('OK: Require - AppSchema1', async () => {
    const { config1, config2 } = await diffLoad(AppSchema1, 'with-schema-class-ok.yml')
    expect(config1).toEqual(config2)
  })

  it('Error: Require - AppSchema1', async () => {
    const errorMsg: string[] = [
      'Configuration is not valid:',
      '  - config A4 does not match the following rules:',
      '    - isObject: A4 must be an object, current config is `undefined`',
    ]

    await expect(diffLoad(AppSchema1, 'a4-empty.yml')).rejects.toThrow(new A4ConfigModuleError(errorMsg.join('\n')))
  })

  it('OK: With default - AppSchema2', async () => {
    const { config1, config2 } = await diffLoad(AppSchema2, 'a4-empty.yml')

    expect((config1 as any).A4.isOpen).toBe(true)
    expect(config2).toEqual({})
  })

  it('OK: Partial - AppSchema3', async () => {
    const { config1, config2 } = await diffLoad(AppSchema3, 'a4-empty.yml')

    expect(config1).toEqual({})
    expect(config2).toEqual({})
  })
})
