/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-12 15:37:46
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 18:07:46
 */

/* eslint-disable @typescript-eslint/brace-style */
import { Injectable, Logger } from '@nestjs/common'
import { DeepPartial } from 'typeorm'

import {
  A4SimpleServicePromise,
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
export class SimpleServicePromise implements A4SimpleServicePromise {
  protected readonly logger: Logger = new Logger('SimpleService')

  public constructor(
    @InjectRepository(IdEntity)
    protected readonly repository: A4TypeORMCrud<IdEntity>
  ) {
    // ...
  }

  public async insert(model: DeepPartial<IdEntity>): Promise<IdEntity> {
    const result = await this.repository.insertToPromise(model)
    return result
  }

  public async insertMulti(modelList: DeepPartial<IdEntity>[]): Promise<IdEntity[]> {
    const result = await this.repository.insertMultiToPromise(modelList)
    return result
  }

  public async selectByPage(
    model: DeepPartial<IdEntity>,
    options: ISelectByPageOptions<IdEntity>
  ): Promise<ISelectByPageReturn<IdEntity>> {
    const result = await this.repository.selectByPageToPromise(model, options)
    return result
  }

  public async selectNoPage(
    model: DeepPartial<IdEntity>,
    options: ISelectNoPageOptions<IdEntity>
  ): Promise<ISelectNoPageReturn<IdEntity>> {
    const result = await this.repository.selectNoPageToPromise(model, options)
    return result
  }

  public async selectById(id: IdEntity['id']): Promise<IdEntity | null> {
    const result = await this.repository.selectByIdToPromise(id)
    return result
  }

  public async selectByIds(ids: UnionToUnionArray<IdEntity['id']>): Promise<IdEntity[]> {
    const result = await this.repository.selectByIdsToPromise(ids)
    return result
  }

  public async updateById(id: IdEntity['id'], model: DeepPartial<IdEntity>): Promise<IUpdateResult> {
    const result = await this.repository.updateByIdToPromise(id, model)
    return result
  }

  public async updateByIds(
    ids: UnionToUnionArray<IdEntity['id']>,
    model: DeepPartial<IdEntity>
  ): Promise<IUpdateResult> {
    const result = await this.repository.updateByIdsToPromise(ids, model)
    return result
  }

  public async deleteById(id: IdEntity['id']): Promise<IDeleteResult> {
    const result = await this.repository.deleteByIdToPromise(id)
    return result
  }

  public async deleteByIds(ids: UnionToUnionArray<IdEntity['id']>): Promise<IDeleteResult> {
    const result = await this.repository.deleteByIdsToPromise(ids)
    return result
  }
}
