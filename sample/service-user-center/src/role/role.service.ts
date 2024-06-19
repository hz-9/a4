/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:06:15
 */
import { Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'

import {
  A4SimpleServiceRxjs,
  DeepPartial,
  IDeleteResult,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from '@hz-9/a4-core'
import { A4TypeORMCrud, InjectA4TypeORMCrud } from '@hz-9/a4-crud-typeorm'

import { RoleInsertResDto } from './dto/role.insert-res.dto'
import { RoleSelectResDto } from './dto/role.select-res.dto'
import { RoleEntity } from './entity/role.entity'

@Injectable()
export class RoleService implements A4SimpleServiceRxjs {
  protected readonly Logger: Logger = new Logger('RoleService')

  public constructor(
    @InjectA4TypeORMCrud(RoleEntity)
    protected readonly crud: A4TypeORMCrud<RoleEntity>
  ) {
    // ...
  }

  public insert(model: DeepPartial<RoleEntity>): Observable<RoleInsertResDto> {
    const result = this.crud.insertToObservable(model)

    return result
  }

  public insertMulti(modelList: DeepPartial<RoleEntity>[]): Observable<RoleInsertResDto[]> {
    const result = this.crud.insertMultiToObservable(modelList)

    return result
  }

  public selectByPage(
    model: DeepPartial<RoleEntity>,
    options: ISelectByPageOptions<RoleEntity>
  ): Observable<ISelectByPageReturn<RoleSelectResDto>> {
    const result = this.crud.selectByPageToObservable(model, options)

    return result
  }

  public selectNoPage(
    model: DeepPartial<RoleEntity>,
    options: ISelectNoPageOptions<RoleEntity>
  ): Observable<ISelectNoPageReturn<RoleSelectResDto>> {
    const result = this.crud.selectNoPageToObservable(model, options)

    return result
  }

  public selectById(id: RoleEntity['id']): Observable<RoleSelectResDto | null> {
    const result = this.crud.selectByIdToObservable(id)

    return result
  }

  public selectByIds(ids: Array<RoleEntity['id']>): Observable<RoleSelectResDto[]> {
    const result = this.crud.selectByIdsToObservable(ids)

    return result
  }

  public updateById(id: RoleEntity['id'], model: DeepPartial<RoleEntity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdToObservable(id, model)

    return result
  }

  public updateByIds(ids: Array<RoleEntity['id']>, model: DeepPartial<RoleEntity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdsToObservable(ids, model)

    return result
  }

  public deleteById(id: RoleEntity['id']): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdToObservable(id)

    return result
  }

  public deleteByIds(ids: Array<RoleEntity['id']>): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdsToObservable(ids)

    return result
  }
}
