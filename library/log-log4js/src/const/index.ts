/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:31:06
 */

/**
 * @public
 *
 *  `A4 Log Log4js` 配置信息默认值。
 *
 *  各参数说明，请查看 [SimpleLoggerConfigSchema](TODO)。
 *
 */
export const LOGGER_MODULE_DEFAULT = {
  LOGGER_LEVEL: 'debug',

  CONSOLE_PATTERN: '[A4] [92m%z[39m  - %d{yyyy-MM-dd hh:mm:ss} [92m%7p[39m [33m[%14.14x{name}][39m [92m%m[39m',

  FILE_PATTERN: '[A4] %-6z - %d{yyyy-MM-dd hh:mm:ss} %7p [%14.14x{name}] %m',

  BASE_DIR: './logs',

  // 1024 * 1024 * 10 = 10485760 (10 MB)
  MAX_LOG_SIZE: 10485760,

  BACK_UPS: 180,

  ENABLE_CALLSTACK: false,
} as const
