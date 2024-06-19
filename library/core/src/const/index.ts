/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 14:10:20
 */
import path from 'node:path'

/**
 * @public
 *
 *  `http.listen` 默认配置。
 *
 */
export const HTTP_LISTEN_DEFAULT = {
  /**
   * 最大重试次数。
   */
  TRY_TIMES: 20,

  /**
   * 重试间隔。
   */
  TRY_INTERVAL: 300,
} as const

/**
 * @public
 */
export const MAIN_STATIC_PATH: string = path.resolve(__dirname, '../../public')

/**
 * @public
 */
export const HOME_STATIC_PATH: string = path.resolve(__dirname, '../../public/home.pug')

/**
 * @public
 */
export const ERROR_WELCOME_MSG: string = 'This is A4 service.'
