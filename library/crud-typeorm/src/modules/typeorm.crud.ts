/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 10:04:06
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common'
import { Observable, from } from 'rxjs'
import { type FindOptionsOrder, type FindOptionsWhere, In, Repository } from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import {
  DeepPartial,
  IA4SimpleDao,
  IDeleteResult,
  IObjectLiteral,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 CRUD TypeORM` 核心模块类。
 *
 */
export class A4TypeORMCrud<E extends IObjectLiteral> implements IA4SimpleDao {
  public readonly logger: Logger = new Logger('A4 Crud TypeORM')

  public readonly instance: Repository<E>

  public constructor(repository: Repository<E>) {
    this.instance = repository
  }

  public async insertToPromise(model: DeepPartial<E>): Promise<E> {
    const result = await this.instance.save(model)
    return result
  }

  public insertToObservable(model: DeepPartial<E>): Observable<E> {
    const result = from(this.insertToPromise(model))

    return result
  }

  public async insertMultiToPromise(modelList: DeepPartial<E>[]): Promise<E[]> {
    const result = await this.instance.save(modelList)
    return result
  }

  public insertMultiToObservable(modelList: DeepPartial<E>[]): Observable<E[]> {
    const result = from(this.insertMultiToPromise(modelList))
    return result
  }

  public async selectByPageToPromise(
    model: DeepPartial<E>,
    options: ISelectByPageOptions<E>
  ): Promise<ISelectByPageReturn<E>> {
    const { page, sort } = options

    const result = await this.instance.findAndCount({
      where: model as FindOptionsWhere<E>,

      /**
       * TODO 将排序数值，进行整理。
       */
      order: sort as FindOptionsOrder<E>,

      skip: (page.pageNum - 1) * page.pageSize,
      take: page.pageSize,
    })

    return {
      data: result[0],

      page: {
        ...page,

        total: result[1],
      },
    }
  }

  public selectByPageToObservable(
    model: DeepPartial<E>,
    options: ISelectByPageOptions<E>
  ): Observable<ISelectByPageReturn<E>> {
    const result = from(this.selectByPageToPromise(model, options))
    return result
  }

  public async selectNoPageToPromise(
    model: DeepPartial<E>,
    options: ISelectNoPageOptions<E>
  ): Promise<ISelectNoPageReturn<E>> {
    const { sort } = options

    const result = await this.instance.findAndCount({
      where: model as FindOptionsWhere<E>,

      order: sort as FindOptionsOrder<E>,
    })

    return {
      data: result[0],
    }
  }

  public selectNoPageToObservable(
    model: DeepPartial<E>,
    options: ISelectNoPageOptions<E>
  ): Observable<ISelectNoPageReturn<E>> {
    const result = from(this.selectNoPageToPromise(model, options))
    return result
  }

  public async selectByIdToPromise(id: any): Promise<E | null> {
    const result = await this.instance.findOneBy({ id })

    return result
  }

  public selectByIdToObservable(id: any): Observable<E | null> {
    const result = from(this.selectByIdToPromise(id))

    return result
  }

  public async selectByIdsToPromise(ids: any[]): Promise<E[]> {
    const result = await this.instance.findBy({
      id: In(ids),
    } as unknown as FindOptionsWhere<E>)

    return result
  }

  public selectByIdsToObservable(ids: any[]): Observable<E[]> {
    const result = from(this.selectByIdsToPromise(ids))

    return result
  }

  public async updateByIdToPromise(id: any, model: DeepPartial<Omit<E, 'id'>>): Promise<IUpdateResult> {
    const result = await this.instance.update(id, model as QueryDeepPartialEntity<E>)

    return result
  }

  public updateByIdToObservable(id: any, model: DeepPartial<Omit<E, 'id'>>): Observable<IUpdateResult> {
    const result = from(this.updateByIdToPromise(id, model))

    return result
  }

  public async updateByIdsToPromise(ids: any[], model: DeepPartial<Omit<E, 'id'>>): Promise<IUpdateResult> {
    const result = await this.instance.update(ids, model as QueryDeepPartialEntity<E>)

    return result
  }

  public updateByIdsToObservable(ids: any[], model: DeepPartial<Omit<E, 'id'>>): Observable<IUpdateResult> {
    const result = from(this.updateByIdsToPromise(ids, model))

    return result
  }

  public async deleteByIdToPromise(id: any): Promise<IDeleteResult> {
    const result = await this.instance.delete(id)

    return result
  }

  public deleteByIdToObservable(id: any): Observable<IUpdateResult> {
    const result = from(this.deleteByIdToPromise(id))

    return result
  }

  public async deleteByIdsToPromise(ids: any[]): Promise<IDeleteResult> {
    const result = await this.instance.delete(ids)

    return result
  }

  public deleteByIdsToObservable(ids: any[]): Observable<IUpdateResult> {
    const result = from(this.deleteByIdsToPromise(ids))

    return result
  }
}
