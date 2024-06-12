/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 18:05:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 16:22:48
 */
import type { Observable } from 'rxjs'

import type { DeepPartial, IObjectLiteral } from '../../../interface'
import type {
  BodyByPageResultDto,
  BodyNoPageResultDto,
  BodyResultDto,
  DeleteEffectInfo,
  PageReqDto,
  ParamAnyIdReqDto,
  ParamAnyIdsReqDto,
  SortReqDto,
  UpdateEffectInfo,
} from '../dto'

/**
 * @public
 *
 *  `A4` 单表控制层抽象类。
 *
 */
export interface IA4SimpleControllerBase {
  /**
   * @public
   *
   *  Restful API - 新增单条记录。
   *
   *  装饰器为 `@Post()`。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.insert` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  insert: (model: DeepPartial<IObjectLiteral>) => BodyResultDto<IObjectLiteral>

  /**
   * @public
   *
   *  Restful API - 分页查询数据。
   *
   *  装饰器为 `@Get()`。
   *
   *  在 `Controller` 中，采用分页查询还是单页查询，主要有业务决定。
   *  为保证分页查询，因不传入分页条件，从而返回单页结果，
   *  在服务端中 `selectByPage` 与 `selectNoPage` 互斥，同时只能有一个绑定为路由。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.selectByPage` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectByPage: (model: IObjectLiteral, page: PageReqDto, sort: SortReqDto) => BodyByPageResultDto<IObjectLiteral[]>

  /**
   * @public
   *
   *  Restful API - 单页查询数据。
   *
   *  装饰器为 `@Get()`。
   *
   *  在 `Controller` 中，采用分页查询还是单页查询，主要有业务决定。
   *  为保证分页查询，因不传入分页条件，从而返回单页结果，
   *  在服务端中 `selectByPage` 与 `selectNoPage` 互斥，同时只能有一个绑定为路由。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.selectNoPage` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectNoPage: (model: IObjectLiteral, sort: SortReqDto) => BodyNoPageResultDto<IObjectLiteral[]>

  /**
   * @public
   *
   *  Restful API - 根据主键查询单条数据
   *
   *  装饰器为 `@Get(:id)`。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.selectById` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectById: (params: ParamAnyIdReqDto) => BodyResultDto<IObjectLiteral | null>

  /**
   * @public
   *
   *  Restful API - 根据主键更新单条数据。
   *
   *  通常装饰器为 `@Patch(:id)`。

   *  修改数据，仅能修改非主键属性。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.updateById` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  updateById: (params: ParamAnyIdReqDto, model: Omit<IObjectLiteral, 'id'>) => BodyResultDto<UpdateEffectInfo>

  /**
   * @public
   *
   *  Restful API - 根据主键删除单条数据。
   *
   *  通常装饰器为 `@Delete(:id)`。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.deleteById` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  deleteById: (params: ParamAnyIdReqDto) => BodyResultDto<DeleteEffectInfo>

  /**
   * @public
   *
   *  Restful API - 新增多条记录。
   *
   *  装饰器为 `@Post('m')`。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.insertMulti` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  insertMulti: (modelList: DeepPartial<IObjectLiteral>[]) => BodyResultDto<IObjectLiteral[]>

  /**
   * @public
   *
   *  Restful API - 根据主键查询多条数据
   *
   *  装饰器为 `@Get(m/:ids)`。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.selectByIds` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  selectByIds: (params: ParamAnyIdsReqDto) => BodyResultDto<IObjectLiteral[]>

  /**
   * @public
   *
   *  Restful API - 根据主键更新多条数据。
   *
   *  通常装饰器为 `@Patch(m/:ids)`。

   *  修改数据，仅能修改非主键属性。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.updateByIds` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  updateByIds: (params: ParamAnyIdsReqDto, model: Omit<IObjectLiteral, 'id'>) => BodyResultDto<UpdateEffectInfo>

  /**
   * @public
   *
   *  Restful API - 根据主键删除多条数据。
   *
   *  通常装饰器为 `@Delete(m/:ids)`。
   *
   * @remarks
   *
   *  考虑实现类的类型安全，`A4SimpleController.prototype.deleteByIds` 并不会严格限制请求参数与返回值。
   *
   *  `A4 Cli` 初始化创建的内容是Restful API 的实践，开发者在保证类型安全的情况下，可在项目中自行修改。
   *
   */
  deleteByIds: (params: ParamAnyIdsReqDto) => BodyResultDto<DeleteEffectInfo>
}

/**
 * @public
 *
 *  `A4` 单表控制层抽象类。
 *
 */
export type A4SimpleControllerPromise = {
  [K in keyof IA4SimpleControllerBase]: (
    ...args: Parameters<IA4SimpleControllerBase[K]>
  ) => Promise<ReturnType<IA4SimpleControllerBase[K]>>
}

/**
 * @public
 *
 *  `A4` 单表控制层抽象类。
 *
 */
export type A4SimpleControllerRxjs = {
  [K in keyof IA4SimpleControllerBase]: (
    ...args: Parameters<IA4SimpleControllerBase[K]>
  ) => Observable<ReturnType<IA4SimpleControllerBase[K]>>
}
