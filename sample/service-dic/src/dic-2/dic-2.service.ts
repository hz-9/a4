/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:50:30
 */
import { Injectable, Logger } from '@nestjs/common'
import { Observable, from } from 'rxjs'

import {
  // ISelectNoPageOptions,
  // ISelectNoPageReturn,
  DeepPartial,
  IDeleteResult,
  ISelectByPageOptions,
  ISelectByPageReturn, // A4SimpleServiceRxjs,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from '@hz-9/a4-core'
// import { cacheWrapToObservable } from '@hz-9/a4-cache'
// import { InjectElasticSearchCrud, A4ElasticSearchCrud } from '@hz-9/a4-crud-elasticsearch'
import { A4ElasticSearchCrud, InjectA4ElasticSearchCrud } from '@hz-9/a4-crud-elasticsearch'

import { Dic2InsertResDto } from './dto/dic-2.insert-res.dto'
import { Dic2SelectResDto } from './dto/dic-2.select-res.dto'
import { Dic2Entity } from './entity/dic-2.entity'

@Injectable()
export class Dic2Service {
  protected readonly Logger: Logger = new Logger('Dic2Service')

  public constructor(
    @InjectA4ElasticSearchCrud(Dic2Entity)
    protected readonly crud: A4ElasticSearchCrud<Dic2Entity>
  ) {
    // ...
    // console.log(this.crud)
  }

  public insert(model: DeepPartial<Dic2Entity>): Observable<Dic2InsertResDto> {
    const result = this.crud.insertToObservable(model)

    return result
  }

  public insertMulti(modelList: DeepPartial<Dic2Entity>[]): Observable<Dic2InsertResDto[]> {
    const result = this.crud.insertMultiToObservable(modelList)

    return result
  }

  public selectByPage(
    model: DeepPartial<Dic2Entity>,
    options: ISelectByPageOptions<Dic2Entity>
  ): Observable<ISelectByPageReturn<Dic2Entity>> {
    const result = this.crud.selectByPageToObservable(model, options)

    return result
  }

  public selectNoPage(
    model: DeepPartial<Dic2Entity>,
    options: ISelectNoPageOptions<Dic2Entity>
  ): Observable<ISelectNoPageReturn<Dic2Entity>> {
    const result = this.crud.selectNoPageToObservable(model, options)

    return result
  }

  public selectById(id: Dic2Entity['id']): Observable<Dic2SelectResDto | null> {
    const result = this.crud.selectByIdToObservable(id)
    return result
  }

  public selectByIds(ids: Array<Dic2Entity['id']>): Observable<Dic2SelectResDto[]> {
    const result = this.crud.selectByIdsToObservable(ids)
    return result
  }

  public updateById(id: Dic2Entity['id'], model: DeepPartial<Dic2Entity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdToObservable(id, model)

    return result
  }

  public updateByIds(ids: Array<Dic2Entity['id']>, model: DeepPartial<Dic2Entity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdsToObservable(ids, model)

    return result
  }

  public deleteById(id: Dic2Entity['id']): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdToObservable(id)

    return result
  }

  public deleteByIds(ids: Array<Dic2Entity['id']>): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdsToObservable(ids)

    return result
  }
}
