/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:21:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:01:57
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

import { UserInsertReqDto } from './dto/user.insert-req.dto'
import { UserInsertMultiResultDto, UserInsertResultDto } from './dto/user.insert-res.dto'
import { UserSelectReqDto } from './dto/user.select-req.dto'
import {
  UserSelectByIdResultDto,
  UserSelectByIdsResultDto,
  UserSelectByPageResultDto,
  UserSelectNoPageResultDto,
} from './dto/user.select-res.dto'
import { UserUpdateReqDto } from './dto/user.update-req.dto'
// import {} from './dto/user.update-res.dto'
// import {} from './dto/user.delete-req.dto'
// import {} from './dto/user.delete-res.dto'
import { UserService } from './user.service'

@UseFilters(RPCExceptionFilter)
@UseInterceptors(new TransformInterceptor({ openLog: true }))
@Controller()
export class UserRedisController implements A4SimpleControllerRxjs {
  protected readonly Logger: Logger = new Logger('UserRedisController')

  public static get rpcPrefix(): string {
    // A4 Cli 自动创建的，请填写 RPC 前缀 eg: 'api.dic.v1.dic'
    return 'api.user-center.v1.user'
  }

  public constructor(protected readonly service: UserService) {
    // ...
  }

  @MessagePattern({ cmd: 'insert' })
  public insert(@Payload('data', ValidationWithDefaultPipe) model: UserInsertReqDto): Observable<UserInsertResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: UserSelectReqDto,
    @Payload('page', ValidationWithDefaultPipe) page: PageReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<UserSelectByPageResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: UserSelectReqDto,
    @Payload('sort', ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<UserSelectNoPageResultDto> {
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
  ): Observable<UserSelectByIdResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: UserUpdateReqDto
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
    @Payload('data', ValidationWithDefaultPipe) modelList: UserInsertReqDto[]
  ): Observable<UserInsertMultiResultDto> {
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
  ): Observable<UserSelectByIdsResultDto> {
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
    @Payload('data', ValidationWithDefaultPipe) model: UserUpdateReqDto
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
