/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 17:26:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 23:30:12
 */
import { Logger } from '@nestjs/common'
import { HttpAdapterHost, NestApplication } from '@nestjs/core'
import chalk from 'chalk'
import type { Request, Response } from 'express'
import { createReadStream } from 'fs-extra'
import _ from 'lodash'
import { nanoid } from 'nanoid'

import { HTTP_LISTEN_DEFAULT } from '../const/index'
import { AllExceptionsFilter, IExceptionRule } from '../exception-filter'
import { IA4ModuleBase } from '../module/_base/index'
import { A4_DOCS, type IA4Docs } from '../module/docs'
import { A4_NETWORK, type IA4Network } from '../module/network'
import { A4_SAFE, type IA4Safe } from '../module/safe'
import { A4Util } from '../util'
import { A4MicroServiceHelp } from './a4-micro-service.help'
import { A4RegistryHelp } from './a4-registry.help'

/**
 *
 * @public
 *
 *  `A4Application.prototype.listen` 传入参数
 *
 */
export interface IA4AppListenOptions {
  /**
   *
   * 若端口被占用，则重新获取端口的最大尝试次数。
   *
   * 可选。默认值为 @see HTTP_LISTEN_DEFAULT.TRY_TIMES
   *
   */
  tryTimes?: number

  /**
   *
   * 若端口被占用，则重新获取端口的时间间隔。
   *
   * 可选。默认值为 @see HTTP_LISTEN_DEFAULT.TRY_INTERVAL
   *
   */
  tryInterval?: number
}

/**
 *
 * @public
 *
 *  `A4Application.prototype.staticFile` 传入参数
 *
 */
export interface IA4AppStaticFileOptions {
  /**
   * 请求路径。
   */
  requestPath: string

  /**
   * 发布文件的绝对路径。可选。
   *
   * filepath fileContent contentCallback 三个属性必选其一
   */
  filepath?: string

  /**
   * 发布文件的内容。可选。
   *
   * filepath fileContent contentCallback 三个属性必选其一
   */
  fileContent?: string

  /**
   * 通过回调函数返回文件内容。可选。
   *
   * filepath fileContent contentCallback 三个属性必选其一
   */
  contentCallback?: () => Promise<string> | string

  /**
   * 'Content-type' 属性。可选。默认为：'text/plain'
   */
  contentType?: string

  /**
   * 日志输出时, logger 标记信息。可选。缺省时，使用 A4Application 默认 Logger
   */
  loggerMarker?: string
}

process.env.A4_INIT_TIME = `${Date.now()}`

/**
 * @public
 *
 *  `NestApplication` 的封装类。
 *
 */
export class A4Application {
  protected readonly logger: Logger = new Logger('A4Application')

  public readonly instanceId: string

  public readonly nestApp: NestApplication

  public readonly microService: A4MicroServiceHelp

  public readonly registry: A4RegistryHelp

  public constructor(nestApp: NestApplication) {
    this.instanceId = nanoid()

    this.nestApp = nestApp
    this.microService = new A4MicroServiceHelp(this)
    this.registry = new A4RegistryHelp(this)
  }

  /**
   * @public
   *
   *  执行模块的 init 函数。
   *
   */
  public async runInit<P extends unknown[], R extends unknown>(
    options: Pick<Required<IA4ModuleBase<P, R>>, 'init'>,
    ...args: P
  ): Promise<R> {
    const r = await options.init(this, ...args)
    return r
  }

  /**
   * @public
   *
   *  执行模块的 start 函数。
   *
   */
  public async runStart<P extends unknown[], R extends unknown>(
    options: Pick<Required<IA4ModuleBase<P, R>>, 'start'>,
    ...args: P
  ): Promise<R> {
    const r = await options.start(this, ...args)
    return r
  }

  /**
   * @public
   *
   *  执行模块的 stop 函数。
   *
   */
  public async runStop<P extends unknown[], R extends unknown>(
    options: Pick<Required<IA4ModuleBase<P, R>>, 'stop'>,
    ...args: P
  ): Promise<R> {
    const r = await options.stop(this, ...args)
    return r
  }

  /**
   * 绑定全局错误拦截。
   */
  public addGlobalExceptionsFilter(rules?: IExceptionRule[]): void {
    const exceptionsFilter = new AllExceptionsFilter(this.nestApp.get(HttpAdapterHost))

    if (rules && rules.length) exceptionsFilter.addExceptionRules(rules)

    this.nestApp.useGlobalFilters(exceptionsFilter)
  }

  /**
   *
   * @public
   *
   *  在 `A4` 服务启动时，替代 `app.listen` 函数的执行。
   *
   */
  public async listen(options?: IA4AppListenOptions): Promise<void> {
    const a4Network: IA4Network = this.nestApp.get(A4_NETWORK)

    const tryTimes = options?.tryTimes ?? HTTP_LISTEN_DEFAULT.TRY_TIMES
    const tryInterval = options?.tryInterval ?? HTTP_LISTEN_DEFAULT.TRY_INTERVAL

    let i = 0

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (i >= tryTimes) {
        await this.nestApp.close()
        break
      }

      const port = await a4Network.getAvailablePort()

      try {
        /**
         * TODO 需要对 ipv6 的绑定进行测试
         */
        await this.nestApp.listen(port)

        a4Network.currentPort = port
        break
      } catch (error) {
        const errorMsg: string = (error as Error).message
        if (errorMsg.includes('Address already in use')) {
          this.logger.warn(`Port ${port} is be used. Try another port.`)
        } else {
          this.logger.error(`Unknown error.`, error)
          await this.nestApp.close()
          break
        }

        await A4Util.sleep(tryInterval)
      }

      i += 1
    }
  }

  /**
   *
   * @public
   *
   *  在正常获取 IP 与端口后，可通过此函数输出日志信息。
   *
   */
  public async printAddress(): Promise<void> {
    const a4Network: IA4Network = this.nestApp.get(A4_NETWORK)
    const info = a4Network.getAddressInfo()
    const urls: string[] = [`http://127.0.0.1:${info.port}/`]

    if (info.bindIPv4) {
      info.ipv4.forEach((ip) => {
        urls.push(`http://${ip}:${info.port}/`)
      })
    }
    if (info.bindIPv6) {
      info.ipv6.forEach((ip) => {
        urls.push(`http://${ip}:${info.port}/`)
      })
    }

    const urlMaxLength = Math.max(...urls.map((i) => i.length))

    urls.forEach((url: string, index: number) => {
      const u = chalk.cyan(_.padEnd(url, urlMaxLength, ' '))
      if (index === 0) {
        const t = chalk.yellowBright(`${Date.now() - +(process.env.A4_INIT_TIME as string)} ms`)
        this.logger.log(`Application runing at: ${u} (+${t})`)
      } else {
        this.logger.log(`                       ${u}`)
      }
    })
  }

  /**
   * @public
   *
   *  发布单个静态资源文件。
   *
   *  支持 文件路径、文件内容多种发布方案。
   *  会按照以下流程读取资源：
   *
   *  1. 通过 filepath 使用流读取文件；
   *  2. 直接返回 content 作为请求体；
   *  3. 返回 404；
   *
   */
  public staticFile(options: IA4AppStaticFileOptions): void {
    const logger: Logger = options.loggerMarker ? new Logger(options.loggerMarker) : this.logger
    logger.log(`Mapped {${options.requestPath}, GET} route`)

    this.nestApp.getHttpAdapter().get(options.requestPath, (req: Request, res: Response) => {
      res.setHeader('Content-type', options.contentType ?? 'text/plain')
      if (options.filepath) {
        // 创建一个可读流来读取文件
        const fileStream = createReadStream(options.filepath)

        // 将文件流管道到响应对象，这样文件内容就会直接发送到客户端
        fileStream.pipe(res)

        // 处理可能发生的错误
        fileStream.on('error', (err) => {
          logger.error(`Get '${options.filepath}' error.`, err)
          res.status(404).send()
        })
      } else if (options.fileContent) {
        res.status(200).send(options.fileContent)
      } else if (options.contentCallback) {
        const a = options.contentCallback()
        if (a instanceof Promise) {
          a.then((b) => {
            res.status(200).send(b)
          }).catch(() => {
            res.status(404).send()
          })
        } else {
          res.status(200).send(a)
        }
      } else {
        res.status(404).send()
      }
    })
  }

  /**
   *
   * @public
   *
   *  初始化 `A4 Docs` 及衍生库。
   *
   */
  public async initDocs(): Promise<void> {
    const a4Docs: IA4Docs = this.nestApp.get(A4_DOCS)

    await a4Docs.init(this)
  }

  /**
   *
   * @public
   *
   *  初始化 `A4 Safe` 及衍生库。
   *
   */
  public async initSafe(): Promise<void> {
    const a4Safe: IA4Safe = this.nestApp.get(A4_SAFE)
    await a4Safe.init(this)
  }
}
