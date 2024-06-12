/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:21:50
 */

/* eslint-disable max-classes-per-file */
import { ClassConstructor } from 'class-transformer'
import { IsOptional, IsString, validateSync } from 'class-validator'
import 'reflect-metadata'

import { IsOptionalNotNull } from '../decorator/is-optional.decorator'
import { ClassValidatorUtil } from '../util/class-validator.util'

/* eslint-disable @rushstack/security/no-unsafe-regexp */

const validateHelp = <S>(schema: ClassConstructor<S>, options: object): S => {
  const validatedConfig = ClassValidatorUtil.p2CwD(schema, options)

  // @ts-ignore
  const errors = validateSync(validatedConfig, {
    forbidUnknownValues: true,
    whitelist: true,
  })

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (errors.length > 0) throw errors[0]

  return JSON.parse(JSON.stringify(validatedConfig))
}

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('IsOptionalNotNull', () => {
  it('OK-1', () => {
    class Config {
      @IsOptionalNotNull()
      @IsString()
      public readonly tempDir: string = './temp'
    }

    const options0 = validateHelp(Config, {})
    const options1 = validateHelp(Config, { tempDir: 'temp' })
    const options2 = validateHelp(Config, { tempDir: undefined })

    expect(options0.tempDir).toBe('./temp')
    expect(options1.tempDir).toBe('temp')
    expect(options2.tempDir).toBe('./temp')

    expect(() => {
      validateHelp(Config, { tempDir: null })
    }).toThrow('')
  })

  /**
   * 此时 tempDir 赋值为 null 时，将会出现超限数值。
   */
  it('Error-1', () => {
    class Config {
      @IsOptional()
      @IsString()
      public readonly tempDir: string = './temp'
    }

    const options0 = validateHelp(Config, {})
    const options1 = validateHelp(Config, { tempDir: 'temp' })
    const options2 = validateHelp(Config, { tempDir: undefined })
    const options3 = validateHelp(Config, { tempDir: null })

    expect(options0.tempDir).toBe('./temp')
    expect(options1.tempDir).toBe('temp')
    expect(options2.tempDir).toBe('./temp')
    expect(options3.tempDir).toBe(null)
  })
})
