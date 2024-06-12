/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-05 16:23:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 18:06:44
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Observable } from 'rxjs'

import type { DeepPartial } from '../../../interface'
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
 *  `A4` 单表简单数据交互层。
 *
 */
export interface IA4SimpleDao {
  /**
   * 数据连接对象。
   */
  instance: any

  /**
   * @public
   *
   *  新增单条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.insert` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  insertToPromise: (model: DeepPartial<any>) => Promise<any>

  /**
   * @public
   *
   *  新增单条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.insert` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  insertToObservable: (model: DeepPartial<any>) => Observable<any>

  /**
   * @public
   *
   *  新增单条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.insertMulti` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  insertMultiToPromise: (modelList: DeepPartial<any>[]) => Promise<any[]>

  /**
   * @public
   *
   *  新增单条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.insertMulti` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  insertMultiToObservable: (modelList: DeepPartial<any>[]) => Observable<any[]>

  /**
   * @public
   *
   *  分页查询数据。

   *  `selectByPage` 与 `selectNoPage` 在 Service 中可同时存在，而在 Controller 中，应仅启用一项。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectNoPage` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  selectByPageToPromise: (
    model: DeepPartial<any>,
    options: ISelectByPageOptions<any>
  ) => Promise<ISelectByPageReturn<any>>

  /**
   * @public
   *
   *  分页查询数据。

   *  `selectByPage` 与 `selectNoPage` 在 Service 中可同时存在，而在 Controller 中，应仅启用一项。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectNoPage` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  selectByPageToObservable: (
    model: DeepPartial<any>,
    options: ISelectByPageOptions<any>
  ) => Observable<ISelectByPageReturn<any>>

  /**
   * @public
   *
   *  单页查询数据。

   *  `selectByPage` 与 `selectNoPage` 在 Service 中可同时存在，而在 Controller 中，应仅启用一项。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectNoPage` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  selectNoPageToPromise: (
    model: DeepPartial<any>,
    options: ISelectNoPageOptions<any>
  ) => Promise<ISelectNoPageReturn<any>>

  /**
   * @public
   *
   *  单页查询数据。

   *  `selectByPage` 与 `selectNoPage` 在 Service 中可同时存在，而在 Controller 中，应仅启用一项。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectNoPage` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  selectNoPageToObservable: (
    model: DeepPartial<any>,
    options: ISelectNoPageOptions<any>
  ) => Observable<ISelectNoPageReturn<any>>

  /**
   * @public
   *
   *  根据主键查询单条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  selectByIdToPromise: (id: any) => Promise<any | null>

  /**
   * @public
   *
   *  根据主键查询单条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  selectByIdToObservable: (id: any) => Observable<any | null>

  /**
   * @public
   *
   *  根据主键查询多条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  selectByIdsToPromise: (ids: any[]) => Promise<any[]>

  /**
   * @public
   *
   *  根据主键查询多条数据。

   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.selectByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  selectByIdsToObservable: (ids: any[]) => Observable<any[]>

  /**
   * @public
   *
   *  根据主键修改单条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.updateById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  updateByIdToPromise: (id: any, model: DeepPartial<any>) => Promise<IUpdateResult>

  /**
   * @public
   *
   *  根据主键修改单条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.updateById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  updateByIdToObservable: (id: any, model: DeepPartial<any>) => Observable<IUpdateResult>

  /**
   * @public
   *
   *  根据主键修改多条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.updateByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  updateByIdsToPromise: (ids: any[], model: DeepPartial<any>) => Promise<IUpdateResult>

  /**
   * @public
   *
   *  根据主键修改多条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.updateByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  updateByIdsToObservable: (ids: any[], model: DeepPartial<any>) => Observable<IUpdateResult>

  /**
   * @public
   *
   *  根据主键删除单条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.deleteById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  deleteByIdToPromise: (id: any) => Promise<IDeleteResult>

  /**
   * @public
   *
   *  根据主键删除单条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.deleteById` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  deleteByIdToObservable: (id: any) => Observable<IDeleteResult>

  /**
   * @public
   *
   *  根据主键删除多条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.deleteByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Promise 对象。
   *
   */
  deleteByIdsToPromise: (ids: any[]) => Promise<IDeleteResult>

  /**
   * @public
   *
   *  根据主键删除多条数据。

   *  修改数据，仅能修改非主键属性。
   *
   *  鉴于考虑了后续方法重写，`IA4SimpleDao.prototype.deleteByIds` 并不会严格限制请求参数与返回值。
   *  `A4 Cli` 初始化创建的内容是一个标准 CRUD 写法，在保证类型安全的情况下，可在项目中自行修改。
   *
   * @returns 返回值为 Observable 对象。
   *
   */
  deleteByIdsToObservable: (ids: any[]) => Observable<IDeleteResult>
}
