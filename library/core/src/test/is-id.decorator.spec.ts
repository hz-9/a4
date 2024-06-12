/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 22:15:48
 */

/* eslint-disable max-classes-per-file */
import { ClassConstructor } from 'class-transformer'
import { validateSync } from 'class-validator'
import 'reflect-metadata'

import { IsId, IsIdArray, IsIdorSId, IsIdorSIdArray, IsSId, IsSIdArray } from '../decorator/is-id.decorator'
import { ClassValidatorUtil } from '../util/class-validator.util'

class Model1 {
  @IsId()
  public readonly id: number
}

class Model2 {
  @IsSId()
  public readonly sid: string
}

class Model3 {
  @IsIdArray()
  public readonly ids: number[]
}

class Model4 {
  @IsSIdArray()
  public readonly sids: string[]
}

class Model5 {
  @IsIdorSId()
  public readonly id: number
}

class Model6 {
  @IsIdorSIdArray()
  public readonly ids: number
}

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

describe('IsId', () => {
  it('OK', () => {
    const options1 = validateHelp(Model1, { id: 123 })
    expect(options1.id).toBe(123)
  })

  it.each(['hello', '123', 0, -1, 1.1, -1.2, true, false, [], null, undefined])(
    'Error: %s is not id.',
    (value: unknown) => {
      /**
       * 因为 validateHelp 未对 ValidationError 进行格式化。此处不进行异常信息的判断。
       */
      expect(() => {
        validateHelp(Model1, { id: value })
      }).toThrow('')
    }
  )
})

describe('IsSId', () => {
  it('OK', () => {
    const options1 = validateHelp(Model2, { sid: '123' })
    expect(options1.sid).toBe('123')
  })

  it.each([0, -1, 1.1, -1.2, true, false, [], 123, null, undefined])('Error: %s is not sid.', (value: unknown) => {
    /**
     * 因为 validateHelp 未对 ValidationError 进行格式化。此处不进行异常信息的判断。
     */
    expect(() => {
      validateHelp(Model2, { sid: value })
    }).toThrow('')
  })
})

describe('IsIdArray', () => {
  it('OK', () => {
    const options1 = validateHelp(Model3, { ids: [123] })
    const options2 = validateHelp(Model3, { ids: [1, 2, 3] })
    expect(options1.ids).toEqual([123])
    expect(options2.ids).toEqual([1, 2, 3])
  })

  it.each([
    ['hello', 1],
    ['123', 1, true],
    [0, 1],
    [-1, 1],
    [1.1, 1],
    [-1.2, 1],
    [true, 1],
    [false, 1],
    ['xxx', 1],
    [[], 1],
    [undefined, 1],
    // @ts-ignore
  ])('Error: %s,%s is not id array.', (...value: unknown[]) => {
    /**
     * 因为 validateHelp 未对 ValidationError 进行格式化。此处不进行异常信息的判断。
     */
    expect(() => {
      validateHelp(Model3, { ids: value })
    }).toThrow('')
  })
})

describe('IsSIdArray', () => {
  it('OK', () => {
    const sids1 = ['1', '2', '3']
    const sids2 = ['1', '2']

    const options1 = validateHelp(Model4, { sids: sids1 })
    const options2 = validateHelp(Model4, { sids: sids2 })
    expect(options1.sids).toEqual(sids1)
    expect(options2.sids).toEqual(sids2)
  })

  it.each([
    ['hello', 1],
    ['123', 1, true],
    [0, 1],
    [-1, 1],
    [1.1, 1],
    [-1.2, 1],
    [true, 1],
    [false, 1],
    ['xxx', 1],
    [[], 1],
    [undefined, 1],
    // @ts-ignore
  ])('Error: %s,%s is not string array.', (...value: unknown[]) => {
    /**
     * 因为 validateHelp 未对 ValidationError 进行格式化。此处不进行异常信息的判断。
     */
    expect(() => {
      validateHelp(Model4, { sids: value })
    }).toThrow('')
  })
})

describe('IsIdOrSId', () => {
  it('OK', () => {
    const options1 = validateHelp(Model5, { id: 123 })
    const options2 = validateHelp(Model5, { id: '123131' })
    expect(options1.id).toBe(123)
    expect(options2.id).toBe('123131')
  })

  it.each([0, -1, 1.1, -1.2, true, false, [], null, undefined])('Error: %s is not id.', (value: unknown) => {
    /**
     * 因为 validateHelp 未对 ValidationError 进行格式化。此处不进行异常信息的判断。
     */
    expect(() => {
      validateHelp(Model5, { id: value })
    }).toThrow('')
  })
})

describe('IsIdOrUIdArray', () => {
  it('OK', () => {
    const options1 = validateHelp(Model6, { ids: [123] })
    const options2 = validateHelp(Model6, { ids: ['123'] })
    expect(options1.ids).toEqual([123])
    expect(options2.ids).toEqual(['123'])
  })

  it.each([
    ['hello', 1],
    ['123', 1, true],
    [0, 1],
    [-1, 1],
    [1.1, 1],
    [-1.2, 1],
    [true, 1],
    [false, 1],
    ['xxx', 1],
    [[], 1],
    [undefined, 1],
    // @ts-ignore
  ])('Error: %s,%s is not string array.', (...value: unknown[]) => {
    /**
     * 因为 validateHelp 未对 ValidationError 进行格式化。此处不进行异常信息的判断。
     */
    expect(() => {
      validateHelp(Model6, { ids: value })
    }).toThrow('')
  })
})
