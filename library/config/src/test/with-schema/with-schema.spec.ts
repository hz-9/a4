/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-25 16:30:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:13:33
 */
import 'reflect-metadata'

import { diffLoad } from '../util'
import { AppConfigSchema1, AppConfigSchema2 } from './with-schema.dto'

describe('With schema.', () => {
  /**
   * 验证，在提供合理配置模版时，
   * 经过校验后的配置内容不发生改变。
   *
   *  isOpen 默认值为 true
   *  isOpen 在配置中为 false
   *
   */
  it('OK: load a4-1.yml - AppConfigSchema1', async () => {
    const { config1, config2 } = await diffLoad(AppConfigSchema1, 'a4-1.yml')

    expect((config1 as any)?.A4?.app?.isOpen).toBe(false)
    expect(config1).toEqual(config2)
    expect(config1).toEqual({
      A4: { app: { isOpen: false } },
    })
  })

  /**
   * 未获取的配置，会进行补全。
   */
  it('OK: load a4-1.yml - AppConfigSchema2', async () => {
    const { config1, config2, config3 } = await diffLoad(AppConfigSchema2, 'a4-1.yml')

    expect((config1 as any)?.A4?.app?.isOpen).toBe(false)
    expect((config1 as any)?.A5?.app?.isOpen).toBe(true)
    expect((config1 as any)?.A4).toEqual((config2 as any).A4)

    expect(config1).toEqual(config3)
  })

  /**
   * 不在配置项内的配置信息，会被忽略。
   */
  it('OK: load a4-1.yml - AppConfigSchema3', async () => {
    const { config1 } = await diffLoad(AppConfigSchema2, 'a4-1.yml')

    expect((config1 as any)?.A4).toBeDefined()
    expect((config1 as any)?.A5).toEqual({ app: { isOpen: true } })
  })

  /**
   * 加载空文件，仍然会返回默认配置。
   */
  it('OK: load a4-empty.yml - AppConfigSchema1', async () => {
    const { config1, config2 } = await diffLoad(AppConfigSchema1, 'a4-empty.yml')

    expect(config1).toEqual({ A4: { app: { isOpen: true } } })
    expect(config2).toEqual({})
  })
})
