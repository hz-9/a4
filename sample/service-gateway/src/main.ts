/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:57:52
 */
import 'reflect-metadata'

import { A4Factory } from '@hz-9/a4-core'
import { A4Log4jsLogModule } from '@hz-9/a4-log-log4js'
import { A4MicroServiceModule } from '@hz-9/a4-micro-service'

import { AppModule } from './app.module'

;(async (): Promise<void> => {
  const app = await A4Factory.create(AppModule, {
    logger: await A4Log4jsLogModule.getInitLogger(),

    // 关闭默认解析工具。
    // bodyParser: false,
    bodyParserPrefix: '/rpc',
    bodyParserLimit: '100mb',
  })

  /**
   * 开启 '/rpc' 路径的 body 解析
   */
  // app.useBodyParser('json', { prefix: '/rpc', limit: '100mb' })
  // app.useBodyParser('urlencoded', { prefix: '/rpc', limit: '100mb', extended: false })

  await app.initDocs()

  await app.initSafe()

  await app.microService.connect()
  await app.microService.start()

  await app.microService.initClients()
  await app.microService.connectClients()

  app.addGlobalExceptionsFilter(A4MicroServiceModule.exceptionRules)

  await app.listen()

  await app.registry.start()

  await app.printAddress()
})()
