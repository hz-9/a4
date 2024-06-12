/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 20:13:58
 */
import { Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'

import {
  A4SimpleServiceRxjs,
  IDeleteResult,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from '@hz-9/a4-core'
import { A4TypeORMCrud, InjectA4TypeORMCrud } from '@hz-9/a4-crud-typeorm'
import { DeepPartial } from '@hz-9/a4-crud-typeorm/typeorm'

import { DicInsertResDto } from './dto/dic.insert-res.dto'
import { DicSelectResDto } from './dto/dic.select-res.dto'
import { DicEntity } from './entity/dic.entity'

@Injectable()
export class DicService implements A4SimpleServiceRxjs {
  protected readonly Logger: Logger = new Logger('DicService')

  public constructor(
    @InjectA4TypeORMCrud(DicEntity)
    protected readonly crud: A4TypeORMCrud<DicEntity>
  ) {
    // ...
  }

  public insert(model: DeepPartial<DicEntity>): Observable<DicInsertResDto> {
    const result = this.crud.insertToObservable(model)
    return result
  }

  public insertMulti(modelList: DeepPartial<DicEntity>[]): Observable<DicInsertResDto[]> {
    const result = this.crud.insertMultiToObservable(modelList)
    return result
  }

  public selectByPage(
    model: DeepPartial<DicEntity>,
    options: ISelectByPageOptions<DicEntity>
  ): Observable<ISelectByPageReturn<DicSelectResDto>> {
    const result = this.crud.selectByPageToObservable(model, options)
    return result
  }

  public selectNoPage(
    model: DeepPartial<DicEntity>,
    options: ISelectNoPageOptions<DicEntity>
  ): Observable<ISelectNoPageReturn<DicSelectResDto>> {
    const result = this.crud.selectNoPageToObservable(model, options)
    return result
  }

  public selectById(id: DicEntity['id']): Observable<DicSelectResDto | null> {
    const result = this.crud.selectByIdToObservable(id)
    return result
  }

  public selectByIds(ids: DicEntity['id'][]): Observable<DicSelectResDto[]> {
    const result = this.crud.selectByIdsToObservable(ids)
    return result
  }

  public updateById(id: DicEntity['id'], model: DeepPartial<DicEntity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdToObservable(id, model)
    return result
  }

  public updateByIds(ids: DicEntity['id'][], model: DeepPartial<DicEntity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdsToObservable(ids, model)
    return result
  }

  public deleteById(id: DicEntity['id']): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdToObservable(id)
    return result
  }

  public deleteByIds(ids: DicEntity['id'][]): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdsToObservable(ids)
    return result
  }
}
