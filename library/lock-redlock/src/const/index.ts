/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:42:03
 */

/**
 * @public
 *
 *  `A4 Lock Redlock` 配置信息默认值。
 *
 *  各参数说明，请查看 @see A4RedLockModuleSchema
 *
 */
export const LOCK_MODULE_DEFAULT = {
  SETTINGS: {
    DRIFT_FACTOR: 0.01,
    RETRY_COUNT: 10,
    RETRY_DELAY: 200,
    RETRY_JITTER: 200,
    AUTOMATIC_EXTENSION_THRESHOLD: 500,
  },
} as const
