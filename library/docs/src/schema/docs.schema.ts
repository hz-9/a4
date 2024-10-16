/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 20:00:55
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsBoolean, IsObject, IsString, ValidateNested } from 'class-validator'

import { CU, IsOptionalNotNull } from '@hz-9/a4-core'

import { DOCS_MODULE_DEFAULT } from '../const'

/**
 *
 * @public
 *
 *  `A4 Docs Module` 的配置项结构。(.ui)
 *
 */
export class A4DocsUIModuleSchema {
  /**
   *
   * 是否显示 `Swagger` 在线文档。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [DOCS_MODULE_DEFAULT.UI.OPEN]
   *
   */
  @IsOptionalNotNull()
  @IsBoolean()
  public readonly open: boolean = DOCS_MODULE_DEFAULT.UI.OPEN

  /**
   *
   * `Swagger` 在线文档的访问路径。
   *
   *  作为 `ConfitSchema` 时，若缺省，则赋值为 [DOCS_MODULE_DEFAULT.UI.PATH]
   *
   * 若服务启动地址为 `http://127.0.0.1:8080`，
   * 则
   *  `http://127.0.0.1:8080/${PREFIX}/${PATH}`（默认为 'http://127.0.0.1:8080/docs/swagger-ui'）
   * 地址访问所有 `Swagger` 在线文档。
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly path: string = DOCS_MODULE_DEFAULT.UI.PATH
}

/**
 *
 * @public
 *
 *  `A4 Docs Module` 的配置项结构。(.file)
 *
 */
export class A4DocsFileModuleSchema {
  /**
   *
   * 是否显示 `Swagger` 在线文档。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [DOCS_MODULE_DEFAULT.SINGLE_FILE.OPEN]
   *
   */
  @IsOptionalNotNull()
  @IsBoolean()
  public readonly open: boolean = DOCS_MODULE_DEFAULT.SINGLE_FILE.OPEN

  /**
   *
   * 是否导出 json 文件。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [DOCS_MODULE_DEFAULT.SINGLE_FILE.EXPORT]
   *
   */
  @IsOptionalNotNull()
  @IsBoolean()
  public readonly export: boolean = DOCS_MODULE_DEFAULT.SINGLE_FILE.EXPORT

  /**
   *
   * `Swagger` json 文件存储路径。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [DOCS_MODULE_DEFAULT.SINGLE_FILE.FILEDIR]
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly filedir: string = DOCS_MODULE_DEFAULT.SINGLE_FILE.FILEDIR

  /**
   *
   * `Swagger` json 格式信息访问地址。
   *
   *  作为 `ConfitSchema` 时，若缺省，则赋值为 [DOCS_MODULE_DEFAULT.SINGLE_FILE.FILENAME]
   *
   * 若服务启动地址为 `http://127.0.0.1:8080`，
   * 则
   *  `http://127.0.0.1:8080/${PREFIX}/${FILENAME}`（默认为 'http://127.0.0.1:8080/docs/'openapi.single.json''）
   * 地址访问所有 `Swagger` 在线文档。
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly filename: string = DOCS_MODULE_DEFAULT.SINGLE_FILE.FILENAME
}

/**
 *
 * @public
 *
 *  `A4 Docs Module` 的配置项结构。
 *
 */
export class A4DocsModuleSchema {
  /**
   *
   * `A4 Docs` 所有接口的前缀。
   *
   *  作为 `ConfitSchema` 时，若缺省，则赋值为 [DOCS_MODULE_DEFAULT.PREFIX]
   *
   * 若服务启动地址为 `http://127.0.0.1:8080`，
   * 则
   *  `http://127.0.0.1:8080/${PREFIX}`（默认为 'http://127.0.0.1:8080/docs'）
   * 地址访问所有 `A4 Docs` Home 页面。
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly prefix: string = DOCS_MODULE_DEFAULT.PREFIX

  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4DocsUIModuleSchema)
  public readonly ui: A4DocsUIModuleSchema = CU.p2CwD(A4DocsUIModuleSchema, {})

  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4DocsFileModuleSchema)
  public readonly file: A4DocsFileModuleSchema = CU.p2CwD(A4DocsFileModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Docs Module` 用于 Multi Schema 类型判断类（A4）
 *
 */
export class A4DocsModuleSchemaB {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4DocsModuleSchema)
  public readonly docs: A4DocsModuleSchema = CU.p2CwD(A4DocsModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Docs Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4DocsModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4DocsModuleSchemaB)
  public readonly A4: A4DocsModuleSchemaB = CU.p2CwD(A4DocsModuleSchemaB, {})
}
