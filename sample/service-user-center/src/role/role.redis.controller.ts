/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:02:50
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
import { MessagePattern, RPCExceptionFilter, ValidationWithDefaultPipe } from '@hz-9/a4-micro-service'
import { Payload } from '@hz-9/a4-micro-service/nestjs-microservices'

import { RoleInsertReqDto } from './dto/role.insert-req.dto'
import { RoleInsertMultiResultDto, RoleInsertResultDto } from './dto/role.insert-res.dto'
import { RoleSelectReqDto } from './dto/role.select-req.dto'
import {
  RoleSelectByIdResultDto,
  RoleSelectByIdsResultDto,
  RoleSelectByPageResultDto,
  RoleSelectNoPageResultDto,
} from './dto/role.select-res.dto'
import { RoleUpdateReqDto } from './dto/role.update-req.dto'
import { RoleService } from './role.service'

// import {} from './dto/role.update-res.dto'
// import {} from './dto/role.delete-req.dto'
// import {} from './dto/role.delete-res.dto'

@UseFilters(RPCExceptionFilter)
@UseInterceptors(new TransformInterceptor({ openLog: true }))
@Controller()
export class RoleRedisController implements A4SimpleControllerRxjs {
  protected readonly Logger: Logger = new Logger('RoleRedisController')

  public static get rpcPrefix(): string {
    // A4 Cli 自动创建的，请填写 RPC 前缀 eg: 'api.dic.v1.dic'
    return 'api.user-center.v1.role'
  }

  public constructor(protected readonly service: RoleService) {
    // ...
  }

  @MessagePattern({ cmd: 'insert' })
  public insert(@Payload('data', ValidationWithDefaultPipe) model: RoleInsertReqDto): Observable<RoleInsertResultDto> {
    const result = this.service.insert(model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.CREATED,
        data: i,
        message: 'ok',
      }))
    )
  }

  @MessagePattern({ cmd: 'selectByPage' })
  public selectByPage(
    @Payload('data', ValidationWithDefaultPipe) model: RoleSelectReqDto,
    @Payload('page', ValidationWithDefaultPipe) page: PageReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<RoleSelectByPageResultDto> {
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

  /* A4 Cli 并未开启当前接口，请添加装饰器 `@MessagePattern({ cmd: 'selectNoPage' })` 开启此路由。 */
  public selectNoPage(
    @Payload('data', ValidationWithDefaultPipe) model: RoleSelectReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<RoleSelectNoPageResultDto> {
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

  @MessagePattern({ cmd: 'selectById' })
  public selectById(
    @Payload('data', ValidationWithDefaultPipe) params: ParamIdReqDto
  ): Observable<RoleSelectByIdResultDto> {
    const result = this.service.selectById(params.id)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  @MessagePattern({ cmd: 'updateById' })
  public updateById(
    @Payload('query', ValidationWithDefaultPipe) params: ParamIdReqDto,
    @Payload('data', ValidationWithDefaultPipe) model: RoleUpdateReqDto
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

  @MessagePattern({ cmd: 'deleteById' })
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

  @MessagePattern({ cmd: 'insertMulti' })
  public insertMulti(
    @Payload('data', ValidationWithDefaultPipe) modelList: RoleInsertReqDto[]
  ): Observable<RoleInsertMultiResultDto> {
    const result = this.service.insertMulti(modelList)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.CREATED,
        data: i,
        message: 'ok',
      }))
    )
  }

  @MessagePattern({ cmd: 'selectByIds' })
  public selectByIds(
    @Payload('data', ValidationWithDefaultPipe) params: ParamIdsReqDto
  ): Observable<RoleSelectByIdsResultDto> {
    const result = this.service.selectByIds(params.ids)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  @MessagePattern({ cmd: 'updateByIds' })
  public updateByIds(
    @Payload('query', ValidationWithDefaultPipe) params: ParamIdsReqDto,
    @Payload('data', ValidationWithDefaultPipe) model: RoleUpdateReqDto
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

  @MessagePattern({ cmd: 'deleteByIds' })
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
