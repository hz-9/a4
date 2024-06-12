/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-27 13:52:11
 */

/* eslint-disable max-classes-per-file */
import { PageResDto } from './page.res.dto'

/**
 * @public
 *
 *  数据修改时，影响的数据条数。
 *
 */
export class UpdateEffectInfo {
  public readonly effectNum: number | null
}

/**
 * @public
 *
 *  数据删除时，影响的数据条数。
 *
 */
export class DeleteEffectInfo {
  public readonly effectNum: number | null
}

/**
 * @public
 *
 *  单条更新操作，返回体。
 *
 */
export class UpdateByIdResultDto {
  public readonly status: number

  public readonly data: UpdateEffectInfo

  public readonly message: string
}

/**
 * @public
 *
 *  多条更新操作，返回体。
 *
 */
export class UpdateByIdsResultDto {
  public readonly status: number

  public readonly data: UpdateEffectInfo

  public readonly message: string
}

/**
 * @public
 *
 *  单条删除操作，返回体。
 *
 */
export class DeleteByIdResultDto {
  public readonly status: number

  public readonly data: DeleteEffectInfo

  public readonly message: string
}

/**
 * @public
 *
 *  多条删除操作，返回体。
 *
 */
export class DeleteByIdsResultDto {
  public readonly status: number

  public readonly data: DeleteEffectInfo

  public readonly message: string
}

/**
 *
 * @public
 *
 *  非分页查询的请求返回结构。
 *
 */
export class BodyResultDto<T> {
  public readonly status: number

  public readonly data: T

  public readonly message: string
}

/**
 *
 * @public
 *
 *  不分页查询的请求返回结构。
 *
 */
export class BodyNoPageResultDto<T> {
  public readonly status: number

  public readonly data: T

  public readonly message: string
}

/**
 *
 * @public
 *
 *  分页查询的请求返回结构。
 *
 */
export class BodyByPageResultDto<T> extends BodyNoPageResultDto<T> {
  public readonly page: PageResDto
}
