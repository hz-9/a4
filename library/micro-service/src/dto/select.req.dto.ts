/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 22:18:55
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'

import { CU, IObjectLiteral, IsIdorSId, IsIdorSIdArray, IsOptionalNotNull, PageReqDto, SortReqDto } from '@hz-9/a4-core'

/**
 * TODO 等待改造
 */

/**
 *
 * @public
 *
 *  跨服务间调用，`SelectByPage` 接口参数。
 *
 */
export class SelectByPageDtoInRpc<T extends IObjectLiteral> {
  @IsOptionalNotNull()
  @IsObject()
  public readonly data: T = {} as T

  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => PageReqDto)
  public readonly page: PageReqDto = CU.p2CwD(PageReqDto, { pageSize: 20, pageNum: 1 })

  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => SortReqDto)
  public readonly sort: SortReqDto = CU.p2CwD(SortReqDto, {})
}

/**
 *
 * @public
 *
 *  跨服务间调用，`SelectNoPage` 接口参数。
 *
 */
export class SelectNoPageDtoInRpc<T extends IObjectLiteral> {
  @IsOptionalNotNull()
  @IsObject()
  public readonly data: T = {} as T

  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => SortReqDto)
  public readonly sort: SortReqDto = CU.p2CwD(SortReqDto, {})
}

/**
 *
 * @public
 *
 *  跨服务间调用，`SelectById` 接口参数。
 *
 */
export class SelectByIdDtoInRpc {
  @IsIdorSId()
  public readonly id: number | string
}

/**
 *
 * @public
 *
 *  跨服务间调用，`SelectByIds` 接口参数。
 *
 */
export class SelectByIdsDtoInRpc {
  @IsIdorSIdArray()
  public readonly ids: number[] | string[]
}
