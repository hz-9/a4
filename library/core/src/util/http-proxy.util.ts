/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-15 22:50:09
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-15 23:02:29
 */

/**
 *
 * @public
 *
 * 跨服务间调用时，使用 HTTP 作为通讯协议时的相关工具。
 *
 */
export class HttpProxyUtil {
  /**
   * 切割工具。
   */
  public static splitUrl(url: string): [string, string, string] {
    const results = url.replace(/^\//, '').split('/')

    if (results.length < 4) throw new Error("Invalid http url. Need like '/api/dic/v1/*'.")

    const [, b, c, ...d] = results
    return [b, c, d.join('/')]
  }
}
