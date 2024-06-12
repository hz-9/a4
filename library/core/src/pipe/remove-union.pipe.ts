/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 12:17:06
 */
import { Injectable, Optional } from '@nestjs/common'

import type { IObjectLiteral } from '../interface'
import { BasePipe, IBasePipeConstructorOptions } from './base.pipe'
import { RemovePagePipe } from './remove-page.pipe'
import { RemoveSortPipe } from './remove-sort.pipe'

/**
 * @public
 *
 *  TODO 思考，也许会废弃？
 *
 *  过于复杂合并的管道合并
 *
 */
@Injectable()
export class RemoveUnionPipe extends BasePipe {
  public readonly removePagePipe: RemovePagePipe

  public readonly removeSortPipe: RemoveSortPipe

  public constructor(@Optional() options?: IBasePipeConstructorOptions) {
    super(options)

    this.removePagePipe = new RemovePagePipe()

    this.removeSortPipe = new RemoveSortPipe()
  }

  public transform(value: IObjectLiteral): IObjectLiteral {
    const v1 = this.removePagePipe.transform(value)
    const v2 = this.removeSortPipe.transform(v1)

    return v2
  }
}
