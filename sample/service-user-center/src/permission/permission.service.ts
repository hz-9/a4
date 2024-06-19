/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:07:00
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

import { PermissionInsertResDto } from './dto/permission.insert-res.dto'
import { PermissionSelectResDto } from './dto/permission.select-res.dto'
import { PermissionEntity } from './entity/permission.entity'

@Injectable()
export class PermissionService implements A4SimpleServiceRxjs {
  protected readonly Logger: Logger = new Logger('PermissionService')

  public constructor(
    @InjectA4TypeORMCrud(PermissionEntity)
    protected readonly crud: A4TypeORMCrud<PermissionEntity>
  ) {
    // ...
  }

  public insert(model: DeepPartial<PermissionEntity>): Observable<PermissionInsertResDto> {
    const result = this.crud.insertToObservable(model)

    return result
  }

  public insertMulti(modelList: DeepPartial<PermissionEntity>[]): Observable<PermissionInsertResDto[]> {
    const result = this.crud.insertMultiToObservable(modelList)

    return result
  }

  public selectByPage(
    model: DeepPartial<PermissionEntity>,
    options: ISelectByPageOptions<PermissionEntity>
  ): Observable<ISelectByPageReturn<PermissionSelectResDto>> {
    const result = this.crud.selectByPageToObservable(model, options)

    return result
  }

  public selectNoPage(
    model: DeepPartial<PermissionEntity>,
    options: ISelectNoPageOptions<PermissionEntity>
  ): Observable<ISelectNoPageReturn<PermissionSelectResDto>> {
    const result = this.crud.selectNoPageToObservable(model, options)

    return result
  }

  public selectById(id: PermissionEntity['id']): Observable<PermissionSelectResDto | null> {
    const result = this.crud.selectByIdToObservable(id)

    return result
  }

  public selectByIds(ids: Array<PermissionEntity['id']>): Observable<PermissionSelectResDto[]> {
    const result = this.crud.selectByIdsToObservable(ids)

    return result
  }

  public updateById(id: PermissionEntity['id'], model: DeepPartial<PermissionEntity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdToObservable(id, model)

    return result
  }

  public updateByIds(
    ids: Array<PermissionEntity['id']>,
    model: DeepPartial<PermissionEntity>
  ): Observable<IUpdateResult> {
    const result = this.crud.updateByIdsToObservable(ids, model)

    return result
  }

  public deleteById(id: PermissionEntity['id']): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdToObservable(id)

    return result
  }

  public deleteByIds(ids: Array<PermissionEntity['id']>): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdsToObservable(ids)

    return result
  }
}
