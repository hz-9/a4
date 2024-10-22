/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 19:30:03
 */
import { A4Factory } from '@hz-9/a4-core'
import { A4Log4jsSimpleLogModule } from '@hz-9/a4-log-log4js'
import { A4MicroServiceModule } from '@hz-9/a4-micro-service'
import 'reflect-metadata'

import { AppModule } from './app.module'

;(async (): Promise<void> => {
  const app = await A4Factory.create(AppModule, {
    logger: await A4Log4jsSimpleLogModule.getInitLogger(),
    bufferLogs: false,
  })

  await app.getA4MicroServiceHelp().connect()

  await app.getA4MicroServiceHelp().start()

  app.addGlobalExceptionsFilter(A4MicroServiceModule.exceptionRules)

  await app.listen()

  await app.getA4RegistryHelp().start()

  await app.printAddress()
})()
