/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 16:26:31
 */
import 'reflect-metadata'

import { A4Config } from '../index'

describe('A4Config.', () => {
  it('Get Info', async () => {
    const a4Config = new A4Config({})

    const a4Info = a4Config.getA4Info()
    const a4StatsInfo = a4Config.getA4StatsInfo()
    const a4EnvInfo = a4Config.getA4EnvInfo()
    const a4PathInfo = a4Config.getA4PathInfo()
    const a4LibrariesInfo = a4Config.getA4LibrariesInfo()

    expect(a4StatsInfo.name).toBeTruthy()

    expect(a4EnvInfo.nodeVersion).toEqual(a4EnvInfo.nodeVersion)
    expect(a4EnvInfo.arch).toBe(process.arch)
    expect(a4EnvInfo.platform).toBe(process.platform)

    expect(a4PathInfo.mainFilepath).toBeTruthy()
    expect(a4PathInfo.mainRoot).toBeTruthy()
    expect(a4PathInfo.mainNormalRoot).toBeTruthy()
    expect(a4PathInfo.cwd).toBe(process.cwd())

    expect({
      ...a4Info,

      upTime: 0,
      upTimeStr: '',
      initTime: 0,
      initTimeStr: '',
      currentTime: 0,
      currentTimeStr: 0,
    }).toEqual({
      ...a4StatsInfo,
      ...a4EnvInfo,
      ...a4PathInfo,
      ...a4LibrariesInfo,

      upTime: 0,
      upTimeStr: '',
      initTime: 0,
      initTimeStr: '',
      currentTime: 0,
      currentTimeStr: 0,
    })
  })
})
