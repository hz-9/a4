/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:19:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 14:11:42
 */
import { Controller, HttpStatus, Logger, UseFilters, UseInterceptors } from '@nestjs/common'
import { Observable, map } from 'rxjs'

import {
  A4CrudUtil,
  A4SimpleControllerRxjs,
  DeleteByIdResultDto,
  DeleteByIdsResultDto,
  PageReqDto,
  ParamIdReqDto,
  ParamIdsReqDto,
  SortReqDto,
  TransformInterceptor,
  UpdateByIdResultDto,
  UpdateByIdsResultDto,
} from '@hz-9/a4-core'
import { A4MessagePattern, RPCExceptionFilter, ValidationWithDefaultPipe } from '@hz-9/a4-micro-service'
import { Payload } from '@hz-9/a4-micro-service/nestjs-microservices'

import { DicService } from './dic.service'
import { DicInsertReqDto } from './dto/dic.insert-req.dto'
import { DicInsertMultiResultDto, DicInsertResultDto } from './dto/dic.insert-res.dto'
import { DicSelectReqDto } from './dto/dic.select-req.dto'
import {
  DicSelectByIdResultDto,
  DicSelectByIdsResultDto,
  DicSelectByPageResultDto,
  DicSelectNoPageResultDto,
} from './dto/dic.select-res.dto'
import { DicUpdateReqDto } from './dto/dic.update-req.dto'

// import {} from './dto/dic.update-res.dto'
// import {} from './dto/dic.delete-req.dto'
// import {} from './dto/dic.delete-res.dto'
// import { DicEntity } from './entity/dic.entity'

@UseFilters(RPCExceptionFilter)
@UseInterceptors(new TransformInterceptor({ openLog: true }))
@Controller()
export class DicRedisController implements A4SimpleControllerRxjs {
  protected readonly Logger: Logger = new Logger('DicRedisController')

  public static get rpcPrefix(): string {
    // A4 Cli 自动创建的，请填写 RPC 前缀 eg: 'api.dic.v1.dic'
    return 'api.dic.v1.dic'
  }

  public constructor(protected readonly service: DicService) {
    // ...
  }

  @A4MessagePattern({ cmd: 'insert' })
  public insert(@Payload('data', ValidationWithDefaultPipe) model: DicInsertReqDto): Observable<DicInsertResultDto> {
    const result = this.service.insert(model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.CREATED,
        data: i,
        message: 'ok',
      }))
    )
  }

  @A4MessagePattern({ cmd: 'selectByPage' })
  public selectByPage(
    @Payload('data', ValidationWithDefaultPipe) model: DicSelectReqDto,
    @Payload('page', ValidationWithDefaultPipe) page: PageReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<DicSelectByPageResultDto> {
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

  /* A4 Cli 并未开启当前接口，请添加装饰器 `@A4MessagePattern({ cmd: 'selectNoPage' })` 开启此路由。 */
  public selectNoPage(
    @Payload('data', ValidationWithDefaultPipe) model: DicSelectReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<DicSelectNoPageResultDto> {
    const result = this.service.selectNoPage(model, {
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

  @A4MessagePattern({ cmd: 'selectById' })
  public selectById(
    @Payload('data', ValidationWithDefaultPipe) params: ParamIdReqDto
  ): Observable<DicSelectByIdResultDto> {
    const result = this.service.selectById(params.id)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  @A4MessagePattern({ cmd: 'updateById' })
  public updateById(
    @Payload('query', ValidationWithDefaultPipe) params: ParamIdReqDto,
    @Payload('data', ValidationWithDefaultPipe) model: DicUpdateReqDto
  ): Observable<UpdateByIdResultDto> {
    const result = this.service.updateById(params.id, model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }

  @A4MessagePattern({ cmd: 'deleteById' })
  public deleteById(
    @Payload('query', ValidationWithDefaultPipe) params: ParamIdReqDto
  ): Observable<DeleteByIdResultDto> {
    const result = this.service.deleteById(params.id)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.NO_CONTENT,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }

  @A4MessagePattern({ cmd: 'insertMulti' })
  public insertMulti(
    @Payload('data', ValidationWithDefaultPipe) modelList: DicInsertReqDto[]
  ): Observable<DicInsertMultiResultDto> {
    const result = this.service.insertMulti(modelList)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.CREATED,
        data: i,
        message: 'ok',
      }))
    )
  }

  @A4MessagePattern({ cmd: 'selectByIds' })
  public selectByIds(
    @Payload('data', ValidationWithDefaultPipe) params: ParamIdsReqDto
  ): Observable<DicSelectByIdsResultDto> {
    const result = this.service.selectByIds(params.ids)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  @A4MessagePattern({ cmd: 'updateByIds' })
  public updateByIds(
    @Payload('query', ValidationWithDefaultPipe) params: ParamIdsReqDto,
    @Payload('data', ValidationWithDefaultPipe) model: DicUpdateReqDto
  ): Observable<UpdateByIdsResultDto> {
    const result = this.service.updateByIds(params.ids, model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }

  @A4MessagePattern({ cmd: 'deleteByIds' })
  public deleteByIds(
    @Payload('query', ValidationWithDefaultPipe) params: ParamIdsReqDto
  ): Observable<DeleteByIdsResultDto> {
    const result = this.service.deleteByIds(params.ids)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.NO_CONTENT,
        data: { effectNum: i.affected ?? null },
        message: 'ok',
      }))
    )
  }
}
