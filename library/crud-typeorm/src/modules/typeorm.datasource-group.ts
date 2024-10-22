import type { DataSource } from 'typeorm'

/**
 * @public
 */
export class TyprORMDataSourceGroup {
  public readonly options: Record<string, DataSource>

  public constructor(options: Record<string, DataSource>) {
    this.options = options
  }
}
