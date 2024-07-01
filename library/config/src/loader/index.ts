/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-31 00:42:36
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:03:07
 */
import { CustomConfigLoader, ICustomConfigLoadOptions } from './custom.loader'
import { FileConfigLoader, IFileConfigLoadOptions } from './file.loader'
import { HttpConfigLoader, IHttpConfigLoadOptions } from './http.loader'

export type { IFileConfigLoadOptions } from './file.loader'
export type { IHttpConfigLoadOptions } from './http.loader'
export type { ICustomConfigLoadOptions } from './custom.loader'

/**
 * @internal
 *
 *  多个类型加载对象的联合类型
 *
 */
export type IAllConfigLoader = FileConfigLoader | HttpConfigLoader | CustomConfigLoader

/**
 *
 * @public
 *
 *  多个类型加载对象配置项的联合类型。
 *
 *  type 默认为 'file'
 *
 */
export type IA4ConfigLoadOptions = IFileConfigLoadOptions | IHttpConfigLoadOptions | ICustomConfigLoadOptions

/**
 * @internal
 *
 *  获取配置加载对象。
 *
 * @param options
 * @returns
 */
export const getLoader = (options: IA4ConfigLoadOptions): IAllConfigLoader => {
  if (options.type === 'http') return new HttpConfigLoader(options)

  if (options.type === 'custom') return new CustomConfigLoader(options)

  return new FileConfigLoader(options)
}
