/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:07:00
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

import { PermissionInsertReqDto } from './dto/permission.insert-req.dto'
import { PermissionInsertMultiResultDto, PermissionInsertResultDto } from './dto/permission.insert-res.dto'
import { PermissionSelectReqDto } from './dto/permission.select-req.dto'
import {
  PermissionSelectByIdResultDto,
  PermissionSelectByIdsResultDto,
  PermissionSelectByPageResultDto,
  PermissionSelectNoPageResultDto,
} from './dto/permission.select-res.dto'
import { PermissionUpdateReqDto } from './dto/permission.update-req.dto'
import { PermissionService } from './permission.service'

// import {} from './dto/permission.update-res.dto'
// import {} from './dto/permission.delete-req.dto'
// import {} from './dto/permission.delete-res.dto'

@UseFilters(RPCExceptionFilter)
@UseInterceptors(new TransformInterceptor({ openLog: true }))
@Controller()
export class PermissionRedisController implements A4SimpleControllerRxjs {
  protected readonly Logger: Logger = new Logger('PermissionRedisController')

  public static get rpcPrefix(): string {
    // A4 Cli 自动创建的，请填写 RPC 前缀 eg: 'api.dic.v1.dic'
    return 'NOT_SET'
  }

  public constructor(protected readonly service: PermissionService) {
    // ...
  }

  @A4MessagePattern({ cmd: 'insert' })
  public insert(
    @Payload('data', ValidationWithDefaultPipe) model: PermissionInsertReqDto
  ): Observable<PermissionInsertResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: PermissionSelectReqDto,
    @Payload('page', ValidationWithDefaultPipe) page: PageReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<PermissionSelectByPageResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: PermissionSelectReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<PermissionSelectNoPageResultDto> {
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
  ): Observable<PermissionSelectByIdResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: PermissionUpdateReqDto
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
    @Payload('data', ValidationWithDefaultPipe) modelList: PermissionInsertReqDto[]
  ): Observable<PermissionInsertMultiResultDto> {
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
  ): Observable<PermissionSelectByIdsResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: PermissionUpdateReqDto
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
