#!/usr/bin/env node

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:44:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-24 17:50:16
 */
import { InitProcess } from '../process/init.process.process'

;(() => {
  new InitProcess().start()
})()
