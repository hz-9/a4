/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:07:00
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'

import {
  A4CrudUtil,
  A4SimpleControllerRxjs,
  DeleteByIdResultDto,
  DeleteByIdsResultDto,
  PageReqDto,
  ParamIdReqDto,
  ParamIdsReqDto,
  ParseMultiNumberPipe,
  ParsePagePipe,
  ParseSortPipe,
  RemovePagePipe,
  RemoveSortPipe,
  SortReqDto,
  TransformInterceptor,
  UpdateByIdResultDto,
  UpdateByIdsResultDto,
  ValidationWithDefaultPipe,
} from '@hz-9/a4-core'
import { ApiTags } from '@hz-9/a4-docs'

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

@ApiTags('Permission')
@Controller('api/permission')
@UseInterceptors(new TransformInterceptor())
export class PermissionHttpController implements A4SimpleControllerRxjs {
  protected readonly Logger: Logger = new Logger('PermissionHttpController')

  public constructor(protected readonly service: PermissionService) {
    // ...
  }

  @Post()
  public insert(@Body(ValidationWithDefaultPipe) model: PermissionInsertReqDto): Observable<PermissionInsertResultDto> {
    const result = this.service.insert(model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.CREATED,
        data: i,
        message: 'ok',
      }))
    )
  }

  @Get()
  public selectByPage(
    @Query(RemovePagePipe, RemoveSortPipe, ParseMultiNumberPipe, ValidationWithDefaultPipe)
    model: PermissionSelectReqDto,
    @Query(ParsePagePipe, ValidationWithDefaultPipe) page: PageReqDto,
    @Query(ParseSortPipe, ValidationWithDefaultPipe) sort: SortReqDto
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

  /* A4 Cli 并未开启当前接口，请添加装饰器 `@Get()` 开启此路由。 */
  public selectNoPage(
    @Query(RemovePagePipe, RemoveSortPipe, ParseMultiNumberPipe, ValidationWithDefaultPipe)
    model: PermissionSelectReqDto,
    @Query(ParseSortPipe, ValidationWithDefaultPipe) sort: SortReqDto
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

  @Get(':id')
  public selectById(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdReqDto
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

  @Patch(':id')
  public updateById(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdReqDto,
    @Body(ValidationWithDefaultPipe) model: PermissionUpdateReqDto
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

  @Delete(':id')
  public deleteById(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdReqDto
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

  @Post('m')
  public insertMulti(
    @Body(ValidationWithDefaultPipe) modelList: PermissionInsertReqDto[]
  ): Observable<PermissionInsertMultiResultDto> {
    const result = this.service.insertMulti(modelList)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.OK,
        data: i,
        message: 'ok',
      }))
    )
  }

  @Get('m/:ids')
  public selectByIds(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdsReqDto
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

  @Patch('m/:ids')
  public updateByIds(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdsReqDto,
    @Body(ValidationWithDefaultPipe) model: PermissionUpdateReqDto
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

  @Delete('m/:ids')
  public deleteByIds(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdsReqDto
  ): Observable<DeleteByIdsResultDto> {
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
