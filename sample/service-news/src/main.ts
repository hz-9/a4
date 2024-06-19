/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 22:37:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 22:37:00
 */
import 'reflect-metadata'

import { A4Factory } from '@hz-9/a4-core'
import { A4Log4jsLogModule } from '@hz-9/a4-log-log4js'
import { A4MicroServiceModule } from '@hz-9/a4-micro-service'

import { AppModule } from './app.module'

;(async (): Promise<void> => {
  const app = await A4Factory.create(AppModule, {
    logger: await A4Log4jsLogModule.getInitLogger(),
  })

  await app.initDocs()

  await app.initSafe()

  await app.microService.connect()

  await app.microService.start()

  app.addGlobalExceptionsFilter(A4MicroServiceModule.exceptionRules)

  await app.listen()

  await app.registry.start()

  await app.printAddress()
})()
