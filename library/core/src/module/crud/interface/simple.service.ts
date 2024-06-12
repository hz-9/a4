/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 18:05:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 16:25:06
 */
import type { Observable } from 'rxjs'

import type { DeepPartial, IObjectLiteral } from '../../../interface'
import type {
  IDeleteResult,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from './base'

/**
 * @public
 *
 *  `A4` 单表服务层抽象类。
 *
 */
export interface IA4SimpleServiceBase {
  /**
   * @public
   *
   *  新增单条数据。

   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.insert` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  insert: (model: DeepPartial<IObjectLiteral>) => IObjectLiteral

  /**
   * @public
   *
   *  新增单条数据。

   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.insertMulti` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  insertMulti: (modelList: DeepPartial<IObjectLiteral>[]) => IObjectLiteral[]

  /**
   * @public
   *
   *  分页查询数据。

   *  `selectByPage` 与 `selectNoPage` 在 Service 中可同时存在，而在 Controller 中，应仅启用一项。
   *
   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.selectNoPage` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectByPage: (
    model: DeepPartial<IObjectLiteral>,
    options: ISelectByPageOptions<IObjectLiteral>
  ) => ISelectByPageReturn<IObjectLiteral>

  /**
   * @public
   *
   *  单页查询数据。

   *  `selectByPage` 与 `selectNoPage` 在 Service 中可同时存在，而在 Controller 中，应仅启用一项。
   *
   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.selectNoPage` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectNoPage: (
    model: DeepPartial<IObjectLiteral>,
    options: ISelectNoPageOptions<IObjectLiteral>
  ) => ISelectNoPageReturn<IObjectLiteral>

  /**
   * @public
   *
   *  根据主键查询单条数据。

   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.selectById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectById: (id: any) => IObjectLiteral | null

  /**
   * @public
   *
   *  根据主键查询多条数据。

   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.selectByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectByIds: (ids: any[]) => IObjectLiteral[]

  /**
   * @public
   *
   *  根据主键修改单条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.updateById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  updateById: (id: any, model: DeepPartial<Omit<IObjectLiteral, 'id'>>) => IUpdateResult

  /**
   * @public
   *
   *  根据主键修改多条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.updateByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  updateByIds: (ids: any[], model: DeepPartial<Omit<IObjectLiteral, 'id'>>) => IUpdateResult

  /**
   * @public
   *
   *  根据主键删除单条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.deleteById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  deleteById: (id: any) => IDeleteResult

  /**
   * @public
   *
   *  根据主键删除多条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`A4SimpleService.prototype.deleteByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  deleteByIds: (ids: any[]) => IDeleteResult
}

/**
 * @public
 *
 *  `A4` 单表服务层抽象类。
 *
 */
export type A4SimpleServiceRxjs = {
  [K in keyof IA4SimpleServiceBase]: (
    ...args: Parameters<IA4SimpleServiceBase[K]>
  ) => Observable<ReturnType<IA4SimpleServiceBase[K]>>
}

/**
 * @public
 *
 *  `A4` 单表服务层抽象类。
 *
 */
export type A4SimpleServicePromise = {
  [K in keyof IA4SimpleServiceBase]: (
    ...args: Parameters<IA4SimpleServiceBase[K]>
  ) => Promise<ReturnType<IA4SimpleServiceBase[K]>>
}
