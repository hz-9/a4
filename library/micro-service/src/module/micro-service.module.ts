/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-20 13:11:10
 */
import { IA4MicroServiceModule, IExceptionRule } from '@hz-9/a4-core'
import { Module } from '@nestjs/common'

import { MicroServiceExceptionRules } from '../exception-filter'
import { A4MicroServiceModuleBase } from './micro-service.module-definition'

/**
 * @public
 *
 *  `A4 Micro Service` 核心模块类。
 *
 */
@Module({})
export class A4MicroServiceModule extends A4MicroServiceModuleBase implements IA4MicroServiceModule {
  public static exceptionRules: IExceptionRule[] = MicroServiceExceptionRules
}
