/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 15:52:56
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from '@hz-9/a4-core/axios'

import { A4ConfigParseError } from '../errors'
import { BaseConfigLoader, IBaseConfigOptions } from './base.loader'

/**
 *
 * @public
 *
 * `HttpConfigLoad` 配置参数（补全参数前）。
 *
 */
export interface IHttpConfigLoadOptions extends IBaseConfigOptions {
  type: 'http'

  /**
   * 请求方式。
   *
   * 默认为 'get'
   */
  method?: 'get' | 'post'

  /**
   *
   * 配置文件加载路径。可以传入多个路径依次尝试。
   * 可选。默认为 [process.cwd()]
   *
   */
  url: string

  /**
   * Axios 请求配置。
   */
  axiosRequestConfig?: AxiosRequestConfig

  /**
   * Axios 实例。
   */
  axiosInstance?: AxiosInstance

  responseParse?: (response: AxiosResponse) => object | Promise<object>
}

/**
 *
 * @internal
 *
 * `HttpConfigLoad` 配置参数（补全参数后）。
 *
 */
export interface IHttpConfigOptions extends Required<IHttpConfigLoadOptions> {
  // ...
}

/**
 *
 * @internal
 *
 *  通过 HTTP 协议请求信息。
 *
 */
export class HttpConfigLoader extends BaseConfigLoader<IHttpConfigLoadOptions, IHttpConfigOptions> {
  protected withDefaultOptions(options: IHttpConfigLoadOptions): IHttpConfigOptions {
    return {
      ...options,
      method: options.method ?? 'get',
      axiosRequestConfig: options.axiosRequestConfig ?? {},
      axiosInstance: options.axiosInstance ?? axios.create(),

      responseParse: options.responseParse ?? ((response: AxiosResponse) => response.data),
    }
  }

  public async asyncLoad(): Promise<object> {
    const { axiosInstance, axiosRequestConfig, url, method, responseParse } = this.options

    try {
      const result = await axiosInstance[method](url, axiosRequestConfig)
      const run = responseParse(result)
      return run instanceof Promise ? await run : run
    } catch (error) {
      // if (error instanceof A4ConfigModuleError) throw error
      throw new A4ConfigParseError((error as Error).message)
    }
  }

  public getSuccessLoggerMsg(): string {
    return `Loaded config from ${this.options.method} - '${this.options.url}'.`
  }
}
