/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 00:57:23
 */

/* eslint-disable max-classes-per-file */
import { plainToClass } from 'class-transformer'
import { IsObject, IsOptional, validateSync } from 'class-validator'
import 'reflect-metadata'

import { IsId } from '../decorator/is-id.decorator'

// import { ClassValidatorUtil } from '../util/class-validator.util'

class Model1 {
  @IsId()
  public readonly id: number

  @IsOptional()
  @IsObject()
  public readonly options: object
}

/* eslint-disable @rushstack/security/no-unsafe-regexp */

const validateHelp = <S>(validatedConfig: any): S => {
  const a = JSON.parse(JSON.stringify(validatedConfig))

  // @ts-ignore
  const errors = validateSync(validatedConfig, {
    forbidUnknownValues: true,
    whitelist: true,
  })

  const b = JSON.parse(JSON.stringify(validatedConfig))

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (errors.length > 0) throw errors[0]

  return { a, b } as S
}

describe.skip('class validator', () => {
  it('OK', () => {
    console.log(validateHelp(plainToClass(Model1, { id: 1, ids: 123 }, { exposeDefaultValues: true })))

    console.log(validateHelp(plainToClass(Model1, { id: 1, ids: 123 })))
  })
})
