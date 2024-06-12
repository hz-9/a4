/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-12 15:37:46
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 18:07:31
 */

/* eslint-disable @typescript-eslint/brace-style */
import { Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { DeepPartial } from 'typeorm'

import {
  A4SimpleServiceRxjs,
  IDeleteResult,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
  IdEntity,
  UnionToUnionArray,
} from '@hz-9/a4-core'

import { InjectRepository } from '../decorators'
import { A4TypeORMCrud } from '../modules/typeorm.crud'

/**
 * @public
 *
 *  单表 CRUD - Service。
 *
 *  仅做模版作用，项目初始化后请使用 A4 Cli 进行 Controller 文件的初始化创建。
 *
 */
@Injectable()
export class SimpleServiceRxjs implements A4SimpleServiceRxjs {
  protected readonly logger: Logger = new Logger('SimpleService')

  public constructor(
    @InjectRepository(IdEntity)
    protected readonly repository: A4TypeORMCrud<IdEntity>
  ) {
    // ...
  }

  public insert(model: DeepPartial<IdEntity>): Observable<IdEntity> {
    const result = this.repository.insertToObservable(model)
    return result
  }

  public insertMulti(modelList: DeepPartial<IdEntity>[]): Observable<IdEntity[]> {
    const result = this.repository.insertMultiToObservable(modelList)
    return result
  }

  public selectByPage(
    model: DeepPartial<IdEntity>,
    options: ISelectByPageOptions<IdEntity>
  ): Observable<ISelectByPageReturn<IdEntity>> {
    const result = this.repository.selectByPageToObservable(model, options)
    return result
  }

  public selectNoPage(
    model: DeepPartial<IdEntity>,
    options: ISelectNoPageOptions<IdEntity>
  ): Observable<ISelectNoPageReturn<IdEntity>> {
    const result = this.repository.selectNoPageToObservable(model, options)
    return result
  }

  public selectById(id: IdEntity['id']): Observable<IdEntity | null> {
    const result = this.repository.selectByIdToObservable(id)
    return result
  }

  public selectByIds(ids: UnionToUnionArray<IdEntity['id']>): Observable<IdEntity[]> {
    const result = this.repository.selectByIdsToObservable(ids)
    return result
  }

  public updateById(id: IdEntity['id'], model: DeepPartial<IdEntity>): Observable<IUpdateResult> {
    const result = this.repository.updateByIdToObservable(id, model)
    return result
  }

  public updateByIds(ids: UnionToUnionArray<IdEntity['id']>, model: DeepPartial<IdEntity>): Observable<IUpdateResult> {
    const result = this.repository.updateByIdsToObservable(ids, model)
    return result
  }

  public deleteById(id: IdEntity['id']): Observable<IDeleteResult> {
    const result = this.repository.deleteByIdToObservable(id)
    return result
  }

  public deleteByIds(ids: UnionToUnionArray<IdEntity['id']>): Observable<IDeleteResult> {
    const result = this.repository.deleteByIdsToObservable(ids)
    return result
  }
}
