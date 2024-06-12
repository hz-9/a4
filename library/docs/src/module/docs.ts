/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:21:31
 */
import { Logger } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'

import type { A4Application, IA4Docs } from '@hz-9/a4-core'
import { mkdirpSync, writeFileSync } from '@hz-9/a4-core/fs-extra'
import { renderFile } from '@hz-9/a4-core/pug'
import { dirname, isAbsolute, resolve } from '@hz-9/a4-core/upath'

import type { IDocsConstructorOptions } from '../interface'

interface IHomeLinkOption {
  label: string
  link: string
}

const loggerMarker = 'A4 Docs' as const

/**
 *
 * @public
 *
 * `A4 Docs` 核心服务类。
 *
 */
export class A4Docs implements IA4Docs {
  protected readonly logger: Logger = new Logger('A4 Docs')

  protected readonly options: IDocsConstructorOptions

  protected readonly homeLinkOptions: IHomeLinkOption[]

  public constructor(options: IDocsConstructorOptions) {
    this.options = options
    this.homeLinkOptions = []
  }

  /**
   *
   * @public
   *
   *  初始化
   *
   */
  public async init(app: A4Application): Promise<void> {
    const document = this._initSwaggerDocument(app)

    this._initSwaggerUI(app, document)
    this._initSwaggerFile(app, document)

    this._initHomePage(app)
  }

  /**
   *
   * @internal
   *
   *  初始化 `Swagger` 文档对象。
   *
   */
  private _initSwaggerDocument(app: A4Application): OpenAPIObject {
    const { normalName, version, description } = this.options.statsInfo

    const config = new DocumentBuilder()
      .setTitle(normalName)
      .addServer('http://127.0.0.1:8000', '直接访问服务')
      .setVersion(version)
      .setDescription(description ?? 'The service API description.')
      .build()

    return SwaggerModule.createDocument(app.nestApp, config)
  }

  /**
   *
   * @internal
   *
   *  发布 Swagger UI。
   *
   */
  private _initSwaggerUI(app: A4Application, document: OpenAPIObject): void {
    if (this.options.ui.open) {
      const requestPath: string = `/${this.options.prefix}/${this.options.ui.path}`
      SwaggerModule.setup(requestPath.replace(/^\//, ''), app.nestApp, document)
      this.logger.log(`Mapped {${requestPath}, GET} route`)

      this.homeLinkOptions.push({
        label: 'Swagger UI',
        link: requestPath,
      })
    }
  }

  /**
   *
   * @internal
   *
   *  发布 openapi.json 文件
   *
   */
  private _initSwaggerFile(app: A4Application, document: OpenAPIObject): void {
    const config = this.options.file
    const filedir = isAbsolute(config.filedir)
      ? config.filedir
      : resolve(this.options.pathInfo.mainNormalRoot, config.filedir)
    const filepath = resolve(filedir, config.filename)

    if (config.export) {
      mkdirpSync(dirname(filepath))
      writeFileSync(filepath, JSON.stringify(document, undefined, 2), { encoding: 'utf8' })
    }

    if (config.open) {
      const requestPath = `/${this.options.prefix}/${config.filename}`

      this.homeLinkOptions.push({
        label: config.filename,
        link: requestPath,
      })

      app.staticFile({
        requestPath,
        filepath,
        contentType: 'application/json',
        loggerMarker,
      })
    }
  }

  /**
   *
   * @internal
   *
   *  发布首页。
   *
   */
  private _initHomePage(app: A4Application): void {
    const filePath =
      this.homeLinkOptions.length === 0
        ? resolve(__dirname, '../../.template/index-empty.pug')
        : resolve(__dirname, '../../.template/index-link.pug')

    const html = renderFile(filePath, { links: this.homeLinkOptions, service: this.options.statsInfo })
    const requestPath = `/${this.options.prefix}`
    app.staticFile({
      requestPath,
      fileContent: html,
      contentType: 'text/html',
      loggerMarker,
    })
  }
}
