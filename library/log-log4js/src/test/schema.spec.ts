/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 22:44:04
 */
import 'reflect-metadata'

import { ClassValidatorUtil } from '@hz-9/a4-core'

import { SIMPLE_LOGGER_MODULE_DEFAULT } from '../const'
import {
  A4Log4jsSimpleLogModuleSchema,
  A4Log4jsSimpleLogModuleSchemaA,
  A4Log4jsSimpleLogModuleSchemaB,
  A4Log4jsSimpleLogModuleSchemaC,
} from '../schema'

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('Schema to options.', () => {
  it.each([{}, { A3: {} }, { A4: {} }, { A4: { x: 1 } }])('OK - Empty A', async (item) => {
    const options = ClassValidatorUtil.p2CwD(A4Log4jsSimpleLogModuleSchemaA, item)

    expect(options.A4.log.log4js.backups).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.BACK_UPS)
    expect(options.A4.log.log4js.baseDir).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.BASE_DIR)
    expect(options.A4.log.log4js.consolePattern).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.CONSOLE_PATTERN)
    expect(options.A4.log.log4js.enableCallStack).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.ENABLE_CALLSTACK)
    expect(options.A4.log.log4js.filePattern).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.FILE_PATTERN)
    expect(options.A4.log.log4js.level).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.LOGGER_LEVEL)
    expect(options.A4.log.log4js.maxLogSize).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.MAX_LOG_SIZE)
    expect(options.A4.log.log4js.enableCallStack).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.ENABLE_CALLSTACK)
  })

  it.each([{}, { A3: {} }, { A4: {} }, { A4: { x: 1 } }])('OK - Empty B', async (item) => {
    const options = ClassValidatorUtil.p2CwD(A4Log4jsSimpleLogModuleSchemaB, item)

    expect(options.log.log4js.backups).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.BACK_UPS)
    expect(options.log.log4js.baseDir).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.BASE_DIR)
    expect(options.log.log4js.consolePattern).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.CONSOLE_PATTERN)
    expect(options.log.log4js.enableCallStack).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.ENABLE_CALLSTACK)
    expect(options.log.log4js.filePattern).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.FILE_PATTERN)
    expect(options.log.log4js.level).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.LOGGER_LEVEL)
    expect(options.log.log4js.maxLogSize).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.MAX_LOG_SIZE)
    expect(options.log.log4js.enableCallStack).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.ENABLE_CALLSTACK)
  })

  it.each([{}, { A3: {} }, { A4: {} }, { A4: { x: 1 } }])('OK - Empty C', async (item) => {
    const options = ClassValidatorUtil.p2CwD(A4Log4jsSimpleLogModuleSchemaC, item)

    expect(options.log4js.backups).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.BACK_UPS)
    expect(options.log4js.baseDir).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.BASE_DIR)
    expect(options.log4js.consolePattern).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.CONSOLE_PATTERN)
    expect(options.log4js.enableCallStack).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.ENABLE_CALLSTACK)
    expect(options.log4js.filePattern).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.FILE_PATTERN)
    expect(options.log4js.level).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.LOGGER_LEVEL)
    expect(options.log4js.maxLogSize).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.MAX_LOG_SIZE)
  })

  it('OK - Empty', async () => {
    const options = ClassValidatorUtil.p2CwD(A4Log4jsSimpleLogModuleSchema, {
      backups: 999,
      // baseDir
      consolePattern: 'xxx',
      enableCallStack: true,
      filePattern: 'yyy',
      level: 'ERROR',
      maxLogSize: 999,
    })

    expect(options.backups).toBe(999)
    expect(options.baseDir).toBe(SIMPLE_LOGGER_MODULE_DEFAULT.BASE_DIR)
    expect(options.consolePattern).toBe('xxx')
    expect(options.enableCallStack).toBe(true)
    expect(options.filePattern).toBe('yyy')
    expect(options.level).toBe('ERROR')
    expect(options.maxLogSize).toBe(999)
  })
})
