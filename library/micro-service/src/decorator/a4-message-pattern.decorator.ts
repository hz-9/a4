/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-23 19:34:22
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 11:17:08
 */
import { MessagePattern as MessagePattern_ } from '@nestjs/microservices'

/* eslint-disable @typescript-eslint/no-explicit-any, prefer-destructuring, no-param-reassign */

/**
 * @public
 *
 *  重写 `@nestjs/microservice` 的 `MessagePattern` 装饰器，对 message-pattern 增加前缀。
 *
 *  必须在该  Controller 增加静态常量 rpcPrefix。
 *
 */
export const A4MessagePattern =
  (metadata: Record<string, string> | string, ...args: any[]): MethodDecorator =>
  (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    // @ts-ignore
    const rpcPrefix: undefined | string = target.constructor.rpcPrefix as string | undefined

    if (typeof rpcPrefix === 'string') {
      if (typeof metadata === 'string') {
        metadata = `${rpcPrefix}.${metadata}`
      } else if (typeof metadata === 'object') {
        const m: Record<string, string> = metadata
        Object.keys(m).forEach((k) => {
          m[k] = `${rpcPrefix}.${m[k]}`
        })
      }
    }

    const r = MessagePattern_(metadata, ...args)
    r(target, key, descriptor)
  }
