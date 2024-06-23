/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 20:37:18
 */
import 'reflect-metadata'

import { A4Factory } from '@hz-9/a4-core'

import { AppModule } from './app.module'

;(async (): Promise<void> => {
  const app = await A4Factory.create(AppModule)

  await app.listen()

  await app.printAddress()
})()
