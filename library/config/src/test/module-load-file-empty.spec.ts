/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-26 23:42:50
 */
import { Test } from '@nestjs/testing'
import path from 'node:path'
import 'reflect-metadata'

import { A4Config, A4ConfigModule } from '../index'

/**
 * 验证 yaml jsonc-parser 对于错误文件和空文件都会解析为空对象。
 */
describe('Load config from empty file.', () => {
  it('OK: load empty yml', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
            configFile: 'a4-empty.yml',
          }),
        }),
      ],
    }).compile()
    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig.config).toEqual({})
  })

  it('OK: load json yml', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            rootDir: path.resolve(__dirname, '../../temp/__static__/json'),
            configFile: 'a4-empty.json',
          }),
        }),
      ],
    }).compile()
    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig.config).toEqual({})
  })
})
