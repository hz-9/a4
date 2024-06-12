/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-12 17:47:53
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 17:45:30
 */

/* eslint-disable @typescript-eslint/brace-style */
import { HttpStatus, Logger } from '@nestjs/common'
import { DeepPartial } from 'typeorm'

import {
  A4CrudUtil,
  A4SimpleControllerPromise,
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

import { SimpleServicePromise } from './simple.service.promise'

/**
 * @public
 *
 *  单表 CRUD - Controller。
 *
 *  仅做模版作用，项目初始化后请使用 A4 Cli 进行 Controller 文件的初始化创建。
 *
 */
export class SimpleControllerPromise implements A4SimpleControllerPromise {
  protected readonly logger: Logger = new Logger('SimpleController')

  public constructor(protected readonly service: SimpleServicePromise) {
    // ...
  }

  public async insert(model: DeepPartial<IObjectLiteral>): Promise<BodyResultDto<IObjectLiteral>> {
    const result = await this.service.insert(model)

    return {
      status: HttpStatus.CREATED,
      data: result,
      message: 'ok',
    }
  }

  public async selectByPage(
    model: IObjectLiteral,
    page: PageReqDto,
    sort: SortReqDto
  ): Promise<BodyByPageResultDto<IObjectLiteral[]>> {
    const result = await this.service.selectByPage(model, {
      page,
      sort: A4CrudUtil.parseSortOptions(sort),
    })

    return {
      status: HttpStatus.OK,
      data: result.data,
      page: result.page,
      message: 'ok',
    }
  }

  public async selectNoPage(
    selectDicDto: IObjectLiteral,
    sort: SortReqDto
  ): Promise<BodyNoPageResultDto<IObjectLiteral[]>> {
    const result = await this.service.selectNoPage(selectDicDto, {
      sort: A4CrudUtil.parseSortOptions(sort),
    })

    return {
      status: HttpStatus.OK,
      data: result.data,
      message: 'ok',
    }
  }

  public async selectById(params: ParamIdReqDto): Promise<BodyResultDto<IObjectLiteral | null>> {
    const result = await this.service.selectById(params.id)

    return {
      status: HttpStatus.OK,
      data: result,
      message: 'ok',
    }
  }

  public async updateById(
    params: ParamIdReqDto,
    model: Omit<IObjectLiteral, 'id'>
  ): Promise<BodyResultDto<UpdateEffectInfo>> {
    const result = await this.service.updateById(params.id, model)

    return {
      status: HttpStatus.OK,
      data: { effectNum: result.affected ?? null },
      message: 'ok',
    }
  }

  public async deleteById(params: ParamIdReqDto): Promise<BodyResultDto<DeleteEffectInfo>> {
    const result = await this.service.deleteById(params.id)

    return {
      status: HttpStatus.NO_CONTENT,
      data: { effectNum: result.affected ?? null },
      message: 'ok',
    }
  }

  public async insertMulti(modelList: DeepPartial<IObjectLiteral>[]): Promise<BodyResultDto<IObjectLiteral[]>> {
    const result = await this.service.insertMulti(modelList)

    return {
      status: HttpStatus.OK,
      data: result,
      message: 'ok',
    }
  }

  public async selectByIds(params: ParamIdsReqDto): Promise<BodyResultDto<IObjectLiteral[]>> {
    const result = await this.service.selectByIds(params.ids)

    return {
      status: HttpStatus.OK,
      data: result,
      message: 'ok',
    }
  }

  public async updateByIds(
    params: ParamIdsReqDto,
    model: Omit<IObjectLiteral, 'id'>
  ): Promise<BodyResultDto<UpdateEffectInfo>> {
    const result = await this.service.updateByIds(params.ids, model)

    return {
      status: HttpStatus.OK,
      data: { effectNum: result.affected ?? null },
      message: 'ok',
    }
  }

  public async deleteByIds(params: ParamIdsReqDto): Promise<BodyResultDto<DeleteEffectInfo>> {
    const result = await this.service.deleteByIds(params.ids)

    return {
      status: HttpStatus.OK,
      data: { effectNum: result.affected ?? null },
      message: 'ok',
    }
  }
}
