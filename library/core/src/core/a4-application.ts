/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-14 17:26:12
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 23:14:58
 */
import { Logger } from '@nestjs/common'
import { HttpAdapterHost, ModuleRef, NestApplication } from '@nestjs/core'
import type { Request, Response } from 'express'
import { createReadStream, readdirSync } from 'fs-extra'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import { renderFile } from 'pug'
import { resolve } from 'upath'

import { ERROR_WELCOME_MSG, HOME_STATIC_PATH, HTTP_LISTEN_DEFAULT, MAIN_STATIC_PATH } from '../const/index'
import { AllExceptionsFilter, IExceptionRule } from '../exception-filter'
import { type IA4Config, getA4Config } from '../module/config'
import { GLOBAL_PROVIDE_TOKEN_A4_DOCS, type IA4Docs } from '../module/docs'
import { GLOBAL_PROVIDE_TOKEN_A4_NETWORK, type IA4Network } from '../module/network'
import { GLOBAL_PROVIDE_TOKEN_A4_SAFE, type IA4Safe } from '../module/safe'
import { A4Color, A4Util } from '../util'
import { A4MicroServiceHelp } from './a4-micro-service.help'
import { A4NetworkB } from './a4-network-b'
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
  contentCallback?: (req: Request, res: Response) => Promise<string> | string

  /**
   * 通过回调函数返回文件内容。可选。
   *
   * filepath fileContent contentCallback 三个属性必选其一
   */
  callback?: (req: Request, res: Response) => Promise<void> | void

  /**
   * 'Content-type' 属性。可选。默认为：'text/plain'
   */
  contentType?: string

  /**
   * 是否输出 logger.
   *
   * 默认：true
   */
  logger?: boolean

  /**
   * 日志输出时, logger 标记信息。可选。缺省时，使用 A4Application 默认 Logger
   */
  loggerMarker?: string
}

process.env.A4_INIT_TIME = `${Date.now()}`

/**
 * @public
 *
 *  初始化构造函数。
 *
 */
export interface IA4AppConstructorOptions {
  /**
   * 指定端口。只有当未加载 `A4 Network` 时，此属性才会有效。
   *
   * 默认：16100
   */
  readonly port?: number

  /**
   * 是否处于 Test 环境，将会停止某些动作。
   *
   * 默认：false
   */
  readonly isTest?: boolean
}

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

  protected readonly microServiceMap: Map<string, A4MicroServiceHelp>

  protected readonly registryMap: Map<string, A4RegistryHelp>

  public readonly network: IA4Network

  public readonly options: Required<IA4AppConstructorOptions>

  public alive: boolean

  public constructor(nestApp: NestApplication, options: IA4AppConstructorOptions = {}) {
    this.instanceId = nanoid()

    this.nestApp = nestApp
    this.microServiceMap = new Map<string, A4MicroServiceHelp>()
    this.registryMap = new Map<string, A4RegistryHelp>()
    this.options = this.optionsWithDefault(options)
    this.network = this.getNetwork()

    this.alive = true
  }

  public getA4RegistryHelp(provideToken: string): A4RegistryHelp {
    const g = this.registryMap.get(provideToken)
    if (g) return g

    const help = new A4RegistryHelp(this, provideToken)
    this.registryMap.set(provideToken, help)
    return help
  }

  public getA4MicroServiceMap(provideToken: string): A4MicroServiceHelp {
    const g = this.microServiceMap.get(provideToken)
    if (g) return g

    const help = new A4MicroServiceHelp(this, provideToken)
    this.microServiceMap.set(provideToken, help)
    return help
  }

  protected optionsWithDefault(options: IA4AppConstructorOptions = {}): Required<IA4AppConstructorOptions> {
    return {
      port: options.port ?? 16100,
      isTest: options.isTest ?? false,
    }
  }

  /**
   * @internal
   *
   *  在不加载 `Network` 时，添加基础类。
   *
   */
  protected getNetwork(): IA4Network {
    if (this.options.isTest) {
      return new A4NetworkB({ port: this.options.port })
    }

    const moduleRef: ModuleRef = this.nestApp.get(ModuleRef)
    try {
      return moduleRef.get(GLOBAL_PROVIDE_TOKEN_A4_NETWORK, { strict: false }) as IA4Network
    } catch (error) {
      this.logger.warn(`'A4 Network' is not loaded, using downgrade scheme.`)
      return new A4NetworkB({ port: this.options.port })
    }
  }

  /**
   * @public
   *
   * 一些异步初始化时间。
   */
  public async init(): Promise<void> {
    await this.initMainRequest()

    await this.tryInitDocs()

    await this.tryInitSafe()
  }

  /**
   * 加载静态请求
   */
  protected async initMainRequest(): Promise<void> {
    readdirSync(MAIN_STATIC_PATH).forEach((filename) => {
      if (filename !== '.DS_Store' && !/.ejs$/.test(filename)) {
        this.staticFile({
          requestPath: `/${filename}`,
          filepath: resolve(MAIN_STATIC_PATH, filename),
          logger: false,
        })
      }
    })

    this.staticFile({
      requestPath: '/alive',
      callback: (req, res) => {
        if (this.alive) {
          res.status(200).send('RUNNING')
        } else {
          res.status(404).send('STOPING')
        }
      },
      logger: false,
    })

    const moduleRef: ModuleRef = this.nestApp.get(ModuleRef)
    const a4Config: IA4Config = getA4Config(moduleRef, this.logger)

    this.staticFile({
      requestPath: '/',
      callback: (req, res) => {
        res.setHeader('Content-type', 'text/html')
        try {
          res.status(200).send(renderFile(HOME_STATIC_PATH, { info: a4Config.getA4Info() }))
        } catch (error) {
          this.logger.error(`Render error.`, error)
          res.status(200).send(ERROR_WELCOME_MSG)
        }
      },
      logger: false,
    })

    this.staticFile({
      requestPath: '/info',
      callback: (req, res) => {
        res.setHeader('Content-type', 'application/json')
        res.status(200).json(a4Config.getA4Info())
      },
      logger: false,
    })

    this.staticFile({
      requestPath: '/info/:type',
      callback: (req, res) => {
        const info = {
          stats: a4Config.getA4StatsInfo(),
          env: a4Config.getA4EnvInfo(),
          path: a4Config.getA4PathInfo(),
          libraries: a4Config.getA4LibrariesInfo(),
          library: a4Config.getA4LibrariesInfo(),
        }[req.params.type]

        if (!info) {
          res.status(404).send()
        } else {
          res.setHeader('Content-type', 'application/json')
          res.status(200).json(info)
        }
      },
      logger: false,
    })
  }

  /**
   *
   * @internal
   *
   *  初始化 `A4 Docs` 及衍生库。
   *
   */
  protected async tryInitDocs(): Promise<void> {
    const moduleRef: ModuleRef = this.nestApp.get(ModuleRef)
    try {
      const a4Docs: IA4Docs = moduleRef.get(GLOBAL_PROVIDE_TOKEN_A4_DOCS, { strict: false })
      await a4Docs.init(this)
    } catch (error) {
      this.logger.debug(`'A4 Docs' is not loaded.`)
    }
  }

  /**
   *
   * @internal
   *
   *  初始化 `A4 Safe` 及衍生库。
   *
   */
  protected async tryInitSafe(): Promise<void> {
    const moduleRef: ModuleRef = this.nestApp.get(ModuleRef)
    try {
      const a4Safe: IA4Safe = moduleRef.get(GLOBAL_PROVIDE_TOKEN_A4_SAFE, { strict: false })
      await a4Safe.init(this)
    } catch (error) {
      this.logger.debug(`'A4 Safe' is not loaded.`)
    }
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
    const tryTimes = options?.tryTimes ?? HTTP_LISTEN_DEFAULT.TRY_TIMES
    const tryInterval = options?.tryInterval ?? HTTP_LISTEN_DEFAULT.TRY_INTERVAL

    let i = 0

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (i >= tryTimes) {
        await this.nestApp.close()
        break
      }

      const port = await this.network.getAvailablePort()

      try {
        /**
         * TODO 需要对 ipv6 的绑定进行测试
         */
        await this.nestApp.listen(port)

        this.network.currentPort = port
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
    const info = this.network.getAddressInfo()
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
      const u = A4Color.cyan(_.padEnd(url, urlMaxLength, ' '))
      if (index === 0) {
        const t = A4Color.yellowBright(`${Date.now() - +(process.env.A4_INIT_TIME as string)} ms`)
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
    if (options.logger ?? true) logger.log(`Mapped {${options.requestPath}, GET} route`)

    this.nestApp.getHttpAdapter().get(options.requestPath, async (req: Request, res: Response) => {
      if (options.filepath) {
        res.setHeader('Content-type', options.contentType ?? 'text/plain')
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
        res.setHeader('Content-type', options.contentType ?? 'text/plain')
        res.status(200).send(options.fileContent)
      } else if (options.contentCallback) {
        res.setHeader('Content-type', options.contentType ?? 'text/plain')
        const a = options.contentCallback(req, res)
        if (a instanceof Promise) {
          a.then((b) => {
            res.status(200).send(b)
          }).catch(() => {
            res.status(404).send()
          })
        } else {
          res.status(200).send(a)
        }
      } else if (options.callback) {
        await options.callback(req, res)
      } else {
        res.status(404).send()
      }
    })
  }
}
