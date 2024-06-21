/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 16:10:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 19:45:38
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common'
import { type FindManyOptions, type FindOptionsOrder, type FindOptionsWhere, In, Repository } from 'typeorm'
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
  PartialKey,
} from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 CRUD TypeORM` 核心模块类。
 *
 */
export class A4TypeORMCrud<E extends IObjectLiteral> extends IA4SimpleDao {
  public readonly logger: Logger = new Logger('A4 Crud TypeORM')

  public readonly instance: Repository<E>

  public constructor(repository: Repository<E>) {
    super()
    this.instance = repository
  }

  public async insertToPromise(model: PartialKey<E, 'id'>): Promise<E> {
    const result = await this.instance.save(model as E)
    return result
  }

  public async insertMultiToPromise(modelList: PartialKey<E, 'id'>[]): Promise<E[]> {
    const result = await this.instance.save(modelList as E[])
    return result
  }

  public async selectByPageToPromise(
    model: DeepPartial<E>,
    options: ISelectByPageOptions<E> = {}
  ): Promise<ISelectByPageReturn<E>> {
    const page = options.page ?? { pageNum: 1, pageSize: 20 }
    const findOptions: FindManyOptions<E> = {
      where: model as FindOptionsWhere<E>,

      skip: (page.pageNum - 1) * page.pageSize,
      take: page.pageSize,
    }
    if (options.sort) findOptions.order = options.sort as FindOptionsOrder<E>

    const result = await this.instance.findAndCount(findOptions)

    return {
      data: result[0],

      page: {
        ...page,

        total: result[1],
      },
    }
  }

  public async selectNoPageToPromise(
    model: DeepPartial<E>,
    options: ISelectNoPageOptions<E> = {}
  ): Promise<ISelectNoPageReturn<E>> {
    const findOptions: FindManyOptions<E> = {
      where: model as FindOptionsWhere<E>,
    }
    if (options.sort) findOptions.order = options.sort as FindOptionsOrder<E>

    const result = await this.instance.findAndCount(findOptions)

    return {
      data: result[0],
    }
  }

  public async selectByIdToPromise(id: E['id']): Promise<E | null> {
    const result = await this.instance.findOneBy({ id })

    return result
  }

  public async selectByIdsToPromise(ids: E['id'][]): Promise<E[]> {
    const result = await this.instance.findBy({
      id: In(ids.map((i) => `${i}`)),
    } as unknown as FindOptionsWhere<E>)

    return result
  }

  public async updateByIdToPromise(id: E['id'], model: DeepPartial<Omit<E, 'id'>>): Promise<IUpdateResult> {
    const result = await this.instance.update(id, model as QueryDeepPartialEntity<E>)

    return result
  }

  public async updateByIdsToPromise(ids: E['id'][], model: DeepPartial<Omit<E, 'id'>>): Promise<IUpdateResult> {
    const result = await this.instance.update(ids, model as QueryDeepPartialEntity<E>)

    return result
  }

  public async deleteByIdToPromise(id: E['id']): Promise<IDeleteResult> {
    const result = await this.instance.delete(id)

    return result
  }

  public async deleteByIdsToPromise(ids: E['id'][]): Promise<IDeleteResult> {
    const result = await this.instance.delete(ids)

    return result
  }
}
