/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:06:59
 */
import { Test } from '@nestjs/testing'
import 'reflect-metadata'

import { A4Config, A4ConfigModule, A4ConfigParseError } from '../index'

/**
 * 从 url 加载配置项
 */
describe('Load config from custom fun.', () => {
  it.each([() => ({ a: 1, b: 2, c: 3 }), async () => ({ a: 1, b: 2, c: 3 })])(
    'OK: load from custom',
    async (loader) => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'custom',
              loader,
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

  it('Error: load url - unknown', async () => {
    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'custom',
              loader: () => {
                throw new Error('Unknown error.')
              },
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigParseError('Unknown error.'))

    await expect(
      Test.createTestingModule({
        imports: [
          A4ConfigModule.forRootAsync({
            isGlobal: false,
            useFactory: async () => ({
              ignoreSchema: true,
              type: 'custom',
              loader: () => {
                throw new A4ConfigParseError('Parse error.')
              },
            }),
          }),
        ],
      }).compile()
    ).rejects.toThrow(new A4ConfigParseError('Parse error.'))
  })
})
