/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:17:56
 */
import 'reflect-metadata'

import type { Equal, Expect, NotEqual } from '@hz-9/a4-core/type-challenges-utils'
import type { MergeDeep } from '@hz-9/a4-core/type-fest'

import { A4Config, A4ConfigUnknownError } from '../index'

class AppSchemaItem1 {
  public readonly s11: string

  public readonly s12?: string
}

class AppSchema1 {
  public readonly obj1: AppSchemaItem1

  public readonly str: string

  public readonly str2?: string

  public readonly isOpen?: boolean

  public readonly num?: number
}

class AppSchemaItem2 {
  public readonly s21: string

  public readonly s22?: string
}

class AppSchema2 {
  public readonly obj2: AppSchemaItem2

  public readonly str4?: string
}

/**
 * 验证 yaml jsonc-parser 对于错误文件和空文件都会解析为空对象。
 */
describe('Get type safe.', () => {
  it('Get', async () => {
    const a4Config1 = new A4Config<AppSchema1>({ str: 'str' })
    const a4Config2 = new A4Config({ str: 'str' })

    const v11 = a4Config1.get('a.b.c')
    const v12 = a4Config1.get('str')
    const v13 = a4Config1.get('str2')
    const v14 = a4Config1.get('str3')
    expect(v11).toBe(undefined)
    expect(v12).toBe('str')
    expect(v13).toBe(undefined)
    expect(v14).toBe(undefined)

    const v15: string = '123'
    // @ts-expect-error
    a4Config1.get('a.b.c', v15)
    const v17 = a4Config1.get('str', v15)
    const v18 = a4Config1.get('str2', v15)
    // @ts-expect-error
    a4Config1.get('str3', v15)

    expect(v17).toBe('str')
    expect(v18).toBe('123')

    const v21 = a4Config2.get('a.b.c')
    const v22 = a4Config2.get('str')
    const v23 = a4Config2.get('str2')
    const v24 = a4Config2.get('str3')
    expect(v21).toBe(undefined)
    expect(v22).toBe('str')
    expect(v23).toBe(undefined)
    expect(v24).toBe(undefined)

    const v25: string = '456'
    const v26 = a4Config2.get('a.b.c', v25)
    const v27 = a4Config2.get('str', v25)
    const v28 = a4Config2.get('str2', v25)
    const v29 = a4Config2.get('str3', v25)
    expect(v26).toBe('456')
    expect(v27).toBe('str')
    expect(v28).toBe('456')
    expect(v29).toBe('456')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Cases = [
      Expect<NotEqual<A4Config<AppSchema1>, A4Config<object>>>,

      Expect<Equal<typeof v11, undefined>>,
      Expect<Equal<typeof v12, string>>,
      Expect<Equal<typeof v13, string | undefined>>,
      Expect<Equal<typeof v14, undefined>>,

      Expect<Equal<typeof v17, string>>,
      // Expect<Equal<typeof v18, string>>, // TODO 修改为可以通过

      Expect<Equal<typeof v21, unknown>>,
      Expect<Equal<typeof v22, unknown>>,
      Expect<Equal<typeof v23, unknown>>,
      Expect<Equal<typeof v24, unknown>>,

      Expect<Equal<typeof v26, unknown>>,
      Expect<Equal<typeof v27, unknown>>,
      Expect<Equal<typeof v28, unknown>>,
      Expect<Equal<typeof v29, unknown>>,
    ]
  })

  it('GetOrThrow', async () => {
    const a4Config1 = new A4Config<AppSchema1>({ str: 'str', str2: 'str2' })
    const a4Config2 = new A4Config({ str: 'str', str2: 'str2' })

    expect(() => {
      a4Config1.getOrThrow('a.b.c')
    }).toThrow(new A4ConfigUnknownError('Configuration key "a.b.c" does not exist'))

    const v12 = a4Config1.getOrThrow('str')
    const v13 = a4Config1.getOrThrow('str2')
    expect(v12).toBe('str')
    expect(v13).toBe('str2')

    const v22 = a4Config2.getOrThrow('str')
    const v23 = a4Config2.getOrThrow('str2')
    expect(v22).toBe('str')
    expect(v23).toBe('str2')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Cases = [
      Expect<NotEqual<A4Config<AppSchema1>, A4Config<object>>>,

      Expect<Equal<typeof v12, string>>,
      Expect<Equal<typeof v13, string | undefined>>,

      Expect<Equal<typeof v22, unknown>>,
      Expect<Equal<typeof v23, unknown>>,
    ]
  })

  it('MergeDeep', async () => {
    type MergeSchema = MergeDeep<AppSchema1, AppSchema2>

    const a4Config1 = new A4Config<MergeSchema>({ str: 'str' })

    const v11 = a4Config1.get('obj1')
    const v12 = a4Config1.get('obj2')
    const v13 = a4Config1.get('str2')
    const v14 = a4Config1.get('str3')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Cases = [
      Expect<NotEqual<A4Config<AppSchema1>, A4Config<object>>>,

      Expect<Equal<typeof v11, AppSchemaItem1>>,
      Expect<Equal<typeof v12, AppSchemaItem2>>,
      Expect<Equal<typeof v13, string | undefined>>,
      Expect<Equal<typeof v14, undefined>>,
    ]
  })
})
