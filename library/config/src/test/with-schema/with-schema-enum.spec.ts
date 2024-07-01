/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-25 16:30:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:08:26
 */
import 'reflect-metadata'

import { A4ConfigModuleError } from '../../index'
import { diffLoad } from '../util'
import { AppSchema1, AppSchema2, AppSchema3 } from './with-schema-enum.dto'

describe('With schema demo - enum.', () => {
  it('OK: Require - AppSchema1', async () => {
    const { config1, config2 } = await diffLoad(AppSchema1, 'with-schema-enum-ok.yml')
    expect(config1).toEqual(config2)
  })

  it('Error: Require - AppSchema1', async () => {
    const errorMsg: string[] = [
      'Configuration is not valid:',
      '  - config platform does not match the following rules:',
      '    - isEnum: platform must be one of the following values: Linux, Windows, MacOS, current config is `undefined`',
    ]

    await expect(diffLoad(AppSchema1, 'a4-empty.yml')).rejects.toThrow(new A4ConfigModuleError(errorMsg.join('\n')))
  })

  it('Error: Require - AppSchema1 - 2', async () => {
    const errorMsg: string[] = [
      'Configuration is not valid:',
      '  - config platform does not match the following rules:',
      '    - isEnum: platform must be one of the following values: Linux, Windows, MacOS, current config is `"macos"`',
    ]

    await expect(diffLoad(AppSchema1, 'with-schema-enum-error.yml')).rejects.toThrow(
      new A4ConfigModuleError(errorMsg.join('\n'))
    )
  })

  it('OK: With default - AppSchema2', async () => {
    const { config1, config2 } = await diffLoad(AppSchema2, 'a4-empty.yml')

    expect((config1 as AppSchema2).platform).toBe('Linux')
    expect(config2).toEqual({})
  })

  it('OK: Partial - AppSchema3', async () => {
    const { config1, config2 } = await diffLoad(AppSchema3, 'a4-empty.yml')

    expect(config1).toEqual({})
    expect(config2).toEqual({})
  })
})
