/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 16:13:32
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
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

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

@ApiTags('Dic')
@Controller('api/dic')
@UseInterceptors(new TransformInterceptor())
export class DicHttpController implements A4SimpleControllerRxjs {
  protected readonly Logger: Logger = new Logger('DicHttpController')

  public constructor(
    // @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    protected readonly service: DicService
  ) {
    // ...
  }

  @Post()
  public insert(@Body(ValidationWithDefaultPipe) model: DicInsertReqDto): Observable<DicInsertResultDto> {
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
    @Query(RemovePagePipe, RemoveSortPipe, ParseMultiNumberPipe, ValidationWithDefaultPipe) model: DicSelectReqDto,
    @Query(ParsePagePipe, ValidationWithDefaultPipe) page: PageReqDto,
    @Query(ParseSortPipe, ValidationWithDefaultPipe) sort: SortReqDto
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

  /* A4 Cli 并未开启当前接口，请添加装饰器 `@Get()` 开启此路由。 */
  public selectNoPage(
    @Query(RemovePagePipe, RemoveSortPipe, ParseMultiNumberPipe, ValidationWithDefaultPipe) model: DicSelectReqDto,
    @Query(ParseSortPipe, ValidationWithDefaultPipe) sort: SortReqDto
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

  @Get(':id')
  public selectById(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdReqDto
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

  @Patch(':id')
  public updateById(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdReqDto,
    @Body(ValidationWithDefaultPipe) model: DicUpdateReqDto
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
    @Body(ValidationWithDefaultPipe) modelList: DicInsertReqDto[]
  ): Observable<DicInsertMultiResultDto> {
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

  @Patch('m/:ids')
  public updateByIds(
    @Param(ParseMultiNumberPipe, ValidationWithDefaultPipe) params: ParamIdsReqDto,
    @Body(ValidationWithDefaultPipe) model: DicUpdateReqDto
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
