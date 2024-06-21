/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-20 17:16:08
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 19:15:39
 */
import { HttpException, HttpStatus } from '@nestjs/common'
import EnvPaths from 'env-paths'
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import selfsigned from 'selfsigned'

import * as fs from '@hz-9/a4-core/fs-extra'
import * as path from '@hz-9/a4-core/upath'

let _privateKey: string = ''
let _publicKey: string = ''

export interface IJWTPayload {
  userId: string
  username: string
}

/**
 * @public
 *
 *  JWT 文件初始化
 *
 */
export class JWTToken {
  protected static setPrivateKey(key: string): void {
    _privateKey = key
  }

  public static getPrivateKey(): string {
    return _privateKey
  }

  protected static setPublicKey(key: string): void {
    _publicKey = key
  }

  public static getPublicKey(): string {
    return _publicKey
  }

  public static initSecretFiles(): void {
    const filepath = path.resolve(EnvPaths('A4/service-user-center').data, '.keys.json')

    const pems: selfsigned.GenerateResult = (() => {
      if (fs.existsSync(filepath)) {
        const json = fs.readFileSync(filepath, { encoding: 'utf8' })
        return JSON.parse(json) as selfsigned.GenerateResult
      }

      const p = selfsigned.generate(undefined, { keySize: 2048 })
      fs.mkdirpSync(path.dirname(filepath))
      fs.writeFileSync(filepath, JSON.stringify(p, undefined, 2), { encoding: 'utf8' })
      return p
    })()

    this.setPrivateKey(pems.private)
    this.setPublicKey(pems.public)
  }

  /**
   *
   * 生成 Token
   *
   * @param payload - Token 内携带的信息
   * @param expiresIn - 用以描述失效时间的字符串。{@link https://www.npmjs.com/package/ms | 格式}
   * @returns
   *
   */
  public static encodeToken(payload: IJWTPayload, expiresIn: string): string {
    const result = jwt.sign(payload, this.getPrivateKey(), { algorithm: 'RS256', expiresIn })
    return result
  }

  public static decodeToken(token: string): IJWTPayload {
    return jwt.verify(token, this.getPublicKey()) as IJWTPayload
  }

  public static decodeTokenWithError(token: string): IJWTPayload {
    try {
      return jwt.verify(token, this.getPublicKey()) as IJWTPayload
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
      }

      if (error instanceof TokenExpiredError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
      }

      if (error instanceof NotBeforeError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
      }

      throw error
    }
  }
}
