/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-12 17:47:53
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 22:52:19
 */

/* eslint-disable @typescript-eslint/brace-style */
import { HttpStatus, Logger } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { DeepPartial } from 'typeorm'

import {
  A4CrudUtil,
  A4SimpleControllerRxjs,
  BodyByPageResultDto,
  BodyNoPageResultDto,
  BodyResultDto,
  DeleteEffectInfo,
  IObjectLiteral,
  PageReqDto,
  ParamIdReqDto,
  ParamIdsReqDto,
  SortReqDto,
  UpdateEffectInfo,
} from '@hz-9/a4-core'

import { SimpleServiceRxjs } from './simple.service.rxjs'

/**
 * @public
 *
 *  单表 CRUD - Controller。
 *
 *  仅做模版作用，项目初始化后请使用 A4 Cli 进行 Controller 文件的初始化创建。
 *
 */
export class SimpleControllerObservable implements A4SimpleControllerRxjs {
  protected readonly logger: Logger = new Logger('SimpleController')

  public constructor(protected readonly service: SimpleServiceRxjs) {
    // ...
  }

  public insert(model: DeepPartial<IObjectLiteral>): Observable<BodyResultDto<IObjectLiteral>> {
    const result = this.service.insert(model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.CREATED,
        data: i,
        message: 'ok',
      }))
    )
  }

  public selectByPage(
    model: IObjectLiteral,
    page: PageReqDto,
    sort: SortReqDto
  ): Observable<BodyByPageResultDto<IObjectLiteral[]>> {
    const result = this.service.selectByPage(model, {
      page,
      sort: A4CrudUtil.parseSortOptions(sort),
    })

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i.data,
        page: i.page,
        message: 'ok',
      }))
    )
  }

  public selectNoPage(
    selectDicDto: IObjectLiteral,
    sort: SortReqDto
  ): Observable<BodyNoPageResultDto<IObjectLiteral[]>> {
    const result = this.service.selectNoPage(selectDicDto, {
      sort: A4CrudUtil.parseSortOptions(sort),
    })

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i.data,
        message: 'ok',
      }))
    )
  }

  public selectById(params: ParamIdReqDto): Observable<BodyResultDto<IObjectLiteral | null>> {
    const result = this.service.selectById(params.id)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  public updateById(
    params: ParamIdReqDto,
    model: Omit<IObjectLiteral, 'id'>
  ): Observable<BodyResultDto<UpdateEffectInfo>> {
    const result = this.service.updateById(params.id, model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }

  public deleteById(params: ParamIdReqDto): Observable<BodyResultDto<DeleteEffectInfo>> {
    const result = this.service.deleteById(params.id)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.NO_CONTENT,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }

  public insertMulti(modelList: DeepPartial<IObjectLiteral>[]): Observable<BodyResultDto<IObjectLiteral[]>> {
    const result = this.service.insertMulti(modelList)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  public selectByIds(params: ParamIdsReqDto): Observable<BodyResultDto<IObjectLiteral[]>> {
    const result = this.service.selectByIds(params.ids)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  public updateByIds(
    params: ParamIdsReqDto,
    model: Omit<IObjectLiteral, 'id'>
  ): Observable<BodyResultDto<UpdateEffectInfo>> {
    const result = this.service.updateByIds(params.ids, model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }

  public deleteByIds(params: ParamIdsReqDto): Observable<BodyResultDto<DeleteEffectInfo>> {
    const result = this.service.deleteByIds(params.ids)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }
}
