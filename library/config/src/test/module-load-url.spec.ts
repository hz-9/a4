/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 15:57:21
 */
import { Test } from '@nestjs/testing'
import MockAdapter from 'axios-mock-adapter'
import 'reflect-metadata'

import axios from '@hz-9/a4-core/axios'

import { A4Config, A4ConfigModule, A4ConfigParseError } from '../index'

/**
 * 从 url 加载配置项
 */
describe('Load config from url.', () => {
  const mock: MockAdapter = new MockAdapter(axios)
  beforeAll(() => {
    mock.onGet('http://localhost:3000/a4-1.json').reply(() => [
      200,
      {
        a: 1,
        b: 2,
        c: 3,
      },
    ])

    mock.onPost('http://localhost:3000/a4-1.json').reply(() => [
      200,
      {
        a: '1',
        b: '2',
        c: '3',
      },
    ])

    mock.onGet('http://localhost:3000/a4-error.json').reply(() => [401, {}])

    mock.onPost('http://localhost:3000/a4-error.json').reply(() => [403, {}])

    mock.onGet('http://localhost:3000/a4-parser.json').reply(() => [
      200,
      {
        obj: {
          a: 1,
          b: 2,
          c: 3,
        },
      },
    ])
  })

  it('OK: load from url - Get', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            type: 'http',
            url: 'http://localhost:3000/a4-1.json',
          }),
        }),
      ],
    }).compile()

    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig.get('a')).toBe(1)
    expect(a4Cofnig.config).toEqual({
      a: 1,
      b: 2,
      c: 3,
    })
    expect(a4Cofnig).toBeInstanceOf(A4Config)
  })

  it('OK: load from url - Post', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        A4ConfigModule.forRootAsync({
          isGlobal: false,
          useFactory: async () => ({
            ignoreSchema: true,
            type: 'http',
            method: 'post',
            url: 'http://localhost:3000/a4-1.json',
          }),
        }),
      ],
    }).compile()

    const a4Cofnig = moduleRef.get(A4Config)
    expect(a4Cofnig.get('a')).toBe('1')
    expect(a4Cofnig.config).toEqual({
      a: '1',
      b: '2',
      c: '3',
    })
    expect(a4Cofnig).toBeInstanceOf(A4Config)
  })

  it('Error: load url - 404', async () => {
    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'http',
              url: 'http://localhost:3000/a4-xxx.json',
              axiosRequestConfig: {
                timeout: 1000,
              },
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigParseError('Request failed with status code 404'))

    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'http',
              method: 'post',
              url: 'http://localhost:3000/a4-xxx.json',
              axiosRequestConfig: {
                timeout: 1000,
              },
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigParseError('Request failed with status code 404'))
  })

  it('Error: load url - 401 & 403', async () => {
    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'http',
              url: 'http://localhost:3000/a4-error.json',
              axiosRequestConfig: {
                timeout: 1000,
              },
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigParseError('Request failed with status code 401'))

    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'http',
              method: 'post',
              url: 'http://localhost:3000/a4-error.json',
              axiosRequestConfig: {
                timeout: 1000,
              },
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigParseError('Request failed with status code 403'))
  })

  it.each([(response: any) => response.data.obj, async (response: any) => response.data.obj])(
    'OK: load from url - Parser - 1',
    async (responseParse) => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'http',
              url: 'http://localhost:3000/a4-parser.json',

              responseParse,
            }),
          }),
        ],
      }).compile()

      const a4Cofnig = moduleRef.get(A4Config)
      expect(a4Cofnig.get('a')).toBe(1)
      expect(a4Cofnig.config).toEqual({
        a: 1,
        b: 2,
        c: 3,
      })
      expect(a4Cofnig).toBeInstanceOf(A4Config)
    }
  )
})
