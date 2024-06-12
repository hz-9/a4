/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:12:40
 */

/**
 * @public
 *
 *  `A4 Docs` 配置信息(.swagger)默认值。
 *
 *  各参数说明，请查看 @see SwaggerDocsConfigSchema
 *
 */
export const DOCS_MODULE_DEFAULT = {
  PREFIX: 'docs',

  UI: {
    OPEN: true,
    PATH: 'swagger-ui',
  },

  SINGLE_FILE: {
    OPEN: true,
    EXPORT: true,
    FILEDIR: 'docs/api',
    FILENAME: 'single.openapi.json',
  },

  MICRO_SERVICE_FILE: {
    OPEN: false,
    EXPORT: false,
    FILEDIR: 'docs/api',
    FILENAME: 'micro-service.openapi.json',
  },
} as const
