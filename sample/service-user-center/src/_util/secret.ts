/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-20 15:42:46
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 18:35:16
 */
// import aes from 'crypto-js/aes'
import utf8Encode from 'crypto-js/enc-utf8'
import hmacSha256 from 'crypto-js/hmac-sha256'
import rc4 from 'crypto-js/rc4'

// const aesKey: string = 'A4-Key-1'
const rc4Key: string = 'A4-Key-2'
const hmacSha256Key: string = 'A4-Key-3'

/**
 * @public
 *
 *  加密工具
 *
 */
export class SecretUtil {
  /**
   * 将字符串进行一次加密
   */
  // public static encodeStrOne(str: string): string {
  //   return hmacSha256(str, hmacSha256Key).toString()
  //   // return aes.encrypt(str, aesKey).toString()
  // }

  /**
   * 将字符串进行两次加密
   */
  public static encodeStr(str: string): string {
    const s2: string = hmacSha256(str, hmacSha256Key).toString()
    return rc4.encrypt(s2, rc4Key).toString()
  }

  // /**
  //  * 将字符串进行一次解密
  //  */
  // public static decodeStrOne(str: string): string {
  //   // return aes.decrypt(str, aesKey).toString(utf8Encode)
  //   return return hmacSha256(str, hmacSha256Key).toString()
  // }

  /**
   * 将字符串进行两次解密
   */
  public static decodeStr(str: string): string {
    return rc4.decrypt(str, rc4Key).toString(utf8Encode)
  }
}
