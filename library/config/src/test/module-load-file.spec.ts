/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:05:24
 */
import { Test } from '@nestjs/testing'
import path from 'node:path'
import 'reflect-metadata'

import { A4Config, A4ConfigModule, A4ConfigNotFoundError } from '../index'

/**
 * 验证文件加载方案。
 */
describe('Load config from file.', () => {
  it('OK: load yml', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
          }),
        }),
      ],
    }).compile()

    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig.get('a')).toBe(1)
    expect(a4Cofnig).toBeInstanceOf(A4Config)
  })

  it('OK: load json', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            type: 'file',
            rootDir: path.resolve(__dirname, '../../temp/__static__/json'),
          }),
        }),
      ],
    }).compile()

    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig).toBeInstanceOf(A4Config)
    expect(a4Cofnig.get('a')).toBe(1)
  })

  it('Error: Not found config file.', async () => {
    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              rootDir: path.resolve(__dirname, '../../temp/__static__/unknown'),
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigNotFoundError('Not found config file.'))

    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              rootDir: path.resolve(__dirname, '../../temp/__static__/unknown'),
              configFile: 'a4-error.xxxxxx',
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigNotFoundError('Not found config file.'))
  })

  it('Error: Unsupported file type.', async () => {
    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              rootDir: path.resolve(__dirname, '../../temp/__static__'),
              configFile: 'unsupport.xml',
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigNotFoundError('Unsupported file type.'))
  })

  it('Error: parse yml error.', async () => {
    // await expect(Test.createTestingModule({
    //   imports: [
    //     A4ConfigModule.forRootAsync({
    //       isGlobal: false,
    //       useFactory: async () => ({
    //         ignoreSchema: true,
    //         rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
    //         configFile: 'a4-error.yml',
    //       }),
    //     })
    //   ],
    // }).compile()).rejects.toThrow(new A4ConfigParseError('Yaml file parse error.'))

    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            rootDir: path.resolve(__dirname, '../../temp/__static__/yml'),
            configFile: 'a4-error.yml',
          }),
        }),
      ],
    }).compile()

    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig.config).toEqual({})
  })

  it('Error: parse json error.', async () => {
    // await expect(Test.createTestingModule({
    //   imports: [
    //     A4ConfigModule.forRootAsync({
    //       isGlobal: false,
    //       useFactory: async () => ({
    //         ignoreSchema: true,
    //         rootDir: path.resolve(__dirname, '../../temp/__static__/json'),
    //         configFile: 'a4-error.json',
    //       }),
    //     })
    //   ],
    // }).compile()).rejects.toThrow(new A4ConfigParseError('Jsonc file parse error.'))

    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            rootDir: path.resolve(__dirname, '../../temp/__static__/json'),
            configFile: 'a4-error.json',
          }),
        }),
      ],
    }).compile()

    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig.config).toEqual({})
  })

  it('Error: invalid paramters.', async () => {
    A4ConfigModule.forRootAsync({
      isGlobal: false,

      // @ts-expect-error
      useFactory: async () => ({}),
    })

    A4ConfigModule.forRootAsync({
      isGlobal: false,

      // @ts-expect-error
      useFactory: async () => ({ ignoreSchema: false }),
    })

    A4ConfigModule.forRootAsync({
      isGlobal: false,
      useFactory: async () => ({ Schema: [] }),
    })

    A4ConfigModule.forRootAsync({
      isGlobal: false,
      useFactory: async () => ({ ignoreSchema: true, Schema: [] }),
    })
  })
})
