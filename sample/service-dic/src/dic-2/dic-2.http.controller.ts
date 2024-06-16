/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 22:53:03
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

// import { CacheTTL } from '@hz-9/a4-cache/nestjs-cache-manager'
import {
  A4CrudUtil,
  A4SimpleControllerRxjs,
  DeleteByIdResultDto,
  DeleteByIdsResultDto,
  PageReqDto,
  ParamIdReqDto,
  ParamIdsReqDto,
  ParamSIdReqDto,
  ParamSIdsReqDto,
  ParseMultiNumberPipe,
  ParseMultiStrArrayPipe,
  ParsePagePipe,
  ParseSortPipe,
  RemovePagePipe,
  RemoveSortPipe,
  SortReqDto,
  TransformInterceptor,
  UpdateByIdResultDto,
  UpdateByIdsResultDto, // UpdateByIdsResultDto,
  ValidationWithDefaultPipe,
} from '@hz-9/a4-core'
import { ApiTags } from '@hz-9/a4-docs'

import { Dic2Service } from './dic-2.service'
import { Dic2InsertReqDto } from './dto/dic-2.insert-req.dto'
import { Dic2InsertMultiResultDto, Dic2InsertResultDto } from './dto/dic-2.insert-res.dto'
import { Dic2SelectReqDto } from './dto/dic-2.select-req.dto'
import {
  Dic2SelectByIdResultDto,
  Dic2SelectByIdsResultDto,
  Dic2SelectByPageResultDto,
  Dic2SelectNoPageResultDto,
} from './dto/dic-2.select-res.dto'
import { Dic2UpdateReqDto } from './dto/dic-2.update-req.dto'

// import {} from './dto/dic.update-res.dto'
// import {} from './dto/dic.delete-req.dto'
// import {} from './dto/dic.delete-res.dto'

@ApiTags('Dic')
@Controller('api/dic2')
@UseInterceptors(new TransformInterceptor())
export class Dic2HttpController {
  protected readonly Logger: Logger = new Logger('DicHttpController')

  public constructor(protected readonly service: Dic2Service) {
    // ...
  }

  @Post()
  public insert(@Body(ValidationWithDefaultPipe) model: Dic2InsertReqDto): Observable<Dic2InsertResultDto> {
    const result = this.service.insert(model)

    return result.pipe(
      map((i) => ({
        status: HttpStatus.CREATED,
        data: i,
        message: 'ok',
      }))
    )
  }

  // @Get()
  // public selectNoPage(
  //   @Query(RemovePagePipe, RemoveSortPipe, ParseMultiNumberPipe, ValidationWithDefaultPipe) model: Dic2SelectReqDto,
  //   @Query(ParseSortPipe, ValidationWithDefaultPipe) sort: SortReqDto
  // ): Observable<Dic2SelectNoPageResultDto> {
  //   const result = this.service.selectNoPage(model, {
  //     sort: A4CrudUtil.parseSortOptions(sort),
  //   })

  //   return result.pipe(
  //     map((i) => ({
  //       status: HttpStatus.OK,
  //       data: i.data,
  //       message: 'ok',
  //     }))
  //   )
  // }

  @Get()
  public selectByPage(
    @Query(RemovePagePipe, RemoveSortPipe, ValidationWithDefaultPipe) model: Dic2SelectReqDto,
    @Query(ParsePagePipe, ValidationWithDefaultPipe) page: PageReqDto,
    @Query(ParseSortPipe, ValidationWithDefaultPipe) sort: SortReqDto
  ): Observable<Dic2SelectByPageResultDto> {
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

  @Get(':id')
  public selectById(@Param(ValidationWithDefaultPipe) params: ParamSIdReqDto): Observable<Dic2SelectByIdResultDto> {
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
    @Param(ValidationWithDefaultPipe) params: ParamSIdReqDto,
    @Body(ValidationWithDefaultPipe) model: Dic2UpdateReqDto
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
  public deleteById(@Param(ValidationWithDefaultPipe) params: ParamSIdReqDto): Observable<DeleteByIdResultDto> {
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
    @Body(ValidationWithDefaultPipe) modelList: Dic2InsertReqDto[]
  ): Observable<Dic2InsertMultiResultDto> {
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
    @Param(ParseMultiStrArrayPipe, ValidationWithDefaultPipe) params: ParamSIdsReqDto
  ): Observable<Dic2SelectByIdsResultDto> {
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
    @Param(ParseMultiStrArrayPipe, ValidationWithDefaultPipe) params: ParamSIdsReqDto,
    @Body(ValidationWithDefaultPipe) model: Dic2UpdateReqDto
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
    @Param(ParseMultiStrArrayPipe, ValidationWithDefaultPipe) params: ParamSIdsReqDto
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
