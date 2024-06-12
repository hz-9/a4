/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:45:23
 */

/**
 * @public
 *
 *  `A4 Safe` 配置信息默认值
 *
 *  @see A4SafeConfigSchema
 *
 */
export const SAFE_MODULE_DEFAULT = {
  CORS: {
    OPEN: false,
  },
  HELMET: {
    OPEN: false,
  },
} as const
