/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:13:05
 * @description  ：测试过程中的工具函数
 */
import { Test } from '@nestjs/testing'
import { ClassConstructor } from 'class-transformer'
import path from 'node:path'

import { A4Config, A4ConfigModule } from '../index'

/**
 *
 * 转换为 string 类型
 *
 */
export const anyToRegExpString = (value: unknown): string => {
  if (value === null) return 'null'
  if (typeof value === 'undefined') return 'undefined'

  if (typeof value === 'string') return value.toString()
  if (typeof value === 'boolean') return value.toString()

  if (typeof value === 'number') return value.toString()
  if (Array.isArray(value)) return `\\[${value.join(',')}\\]`

  return JSON.stringify(value)
}

interface IDiffLoadReturn {
  config1: object
  config2: object
  config3: object
}

export const diffLoad = async (schema: ClassConstructor<object>, configFile: string): Promise<IDiffLoadReturn> => {
  const moduleRef1 = await Test.createTestingModule({
    imports: [
      A4ConfigModule.forRootAsync({
        isGlobal: false,
        useFactory: async () => ({
          rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
          configFile,
          Schema: schema,

          errorColer: false,
        }),
      }),
    ],
  }).compile()

  const moduleRef2 = await Test.createTestingModule({
    imports: [
      A4ConfigModule.forRootAsync({
        isGlobal: false,
        useFactory: async () => ({
          rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
          configFile,
          ignoreSchema: true,
        }),
      }),
    ],
  }).compile()

  const moduleRef3 = await Test.createTestingModule({
    imports: [
      A4ConfigModule.forRootAsync({
        isGlobal: false,
        useFactory: async () => ({
          rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
          configFile,
          Schema: [schema],

          errorColer: false,
        }),
      }),
    ],
  }).compile()

  const a4Cofnig1 = moduleRef1.get(A4Config)
  const a4Cofnig2 = moduleRef2.get(A4Config)
  const a4Cofnig3 = moduleRef3.get(A4Config)

  return {
    config1: a4Cofnig1.config,
    config2: a4Cofnig2.config,
    config3: a4Cofnig3.config,
  }
}
