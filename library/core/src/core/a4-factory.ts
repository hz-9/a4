/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 11:44:19
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 12:57:12
 */
import type { NestApplicationOptions } from '@nestjs/common'
import { NestApplication } from '@nestjs/core/nest-application'
import { NestFactory } from '@nestjs/core/nest-factory'

import { LogoUtil } from '../util'
import { A4Application, type IA4AppConstructorOptions } from './a4-application'
import { A4ExpressAdapter } from './a4-express-adapter'

interface IA4FactoryInitBodyParserOptions {
  /**
   * 是否开启 bodyParser。可选。默认为 true
   */
  readonly bodyParser?: boolean

  /**
   * body 体解析大小。可选。默认为 '100kb'
   */
  readonly bodyParserLimit?: number | string | undefined

  /**
   * body 解析中间件，前缀。
   */
  readonly bodyParserPrefix?: string
}

/**
 * @public
 */
export type IA4FactoryCreateOptions = NestApplicationOptions &
  Omit<IA4FactoryInitBodyParserOptions, 'bodyParser'> &
  IA4AppConstructorOptions & {
    /**
     * 是否输出日志信息。可选。默认为 true
     */
    readonly printLogo?: boolean
  }

/**
 * 自动修正 NODE_ENV
 */
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

/**
 * @public
 */
export class A4Factory {
  protected static initBodyParser(nestApplication: NestApplication, options: IA4FactoryInitBodyParserOptions): void {
    if (options.bodyParser ?? true) {
      nestApplication.useBodyParser('json', {
        prefix: options.bodyParserPrefix,
        limit: options.bodyParserLimit ?? '100kb',
      })
      nestApplication.useBodyParser('urlencoded', {
        prefix: options?.bodyParserPrefix,
        limit: options?.bodyParserLimit ?? '100kb',
        extended: false,
      })
    }
  }

  public static async create(module: unknown, options: IA4FactoryCreateOptions = {}): Promise<A4Application> {
    if (options?.printLogo ?? true) LogoUtil.print()

    const nestApplication: NestApplication = await NestFactory.create(module, new A4ExpressAdapter(), {
      ...options,
      bodyParser: false, // 不再自动创建，使用 A4Factory._initBodyParser 手动创建。
    })

    this.initBodyParser(nestApplication, options)

    const app = new A4Application(nestApplication, { port: options?.port })

    await app.init()
    return app
  }
}
