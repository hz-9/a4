/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-15 23:09:57
 */
import 'reflect-metadata'

import { HttpProxyUtil } from '../util/http-proxy.util'

/* eslint-disable @rushstack/security/no-unsafe-regexp */

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('HttpProxyUtil', () => {
  it('Split url - OK', () => {
    const result = HttpProxyUtil.splitUrl('/api/dic/v1/dic?pageNum=xxxxx&id=xxxx')
    expect(result[0]).toBe('dic')
    expect(result[1]).toBe('v1')
    expect(result[2]).toBe('dic?pageNum=xxxxx&id=xxxx')
  })

  it('Split url - Error1', () => {
    const invalidUrls: string[] = ['', '/', '/api', '/api/dic', '/api/dic/v1']
    const errMsg: string = "Invalid http url. Need like '/api/dic/v1/*'."

    invalidUrls.forEach((invalidUrl) => {
      expect(() => {
        HttpProxyUtil.splitUrl(invalidUrl)
      }).toThrow(errMsg)
    })
  })
})
