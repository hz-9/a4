import { Index } from '../interface'

/**
 * 用于托管 Index 的存储空间。
 */
export class IndicesStorage {
  protected static readonly storage: Map<string, Index[]> = new Map<string, Index[]>()

  public static addIndicesByDataSource(dbName: string, indices: Index[]): void {
    let collection = this.storage.get(dbName)
    if (!collection) {
      collection = []
      this.storage.set(dbName, collection)
    }

    indices.forEach((index) => {
      if (collection!.includes(index)) {
        return
      }
      collection!.push(index)
    })
  }

  public static getIndicesByDataSource(dbName: string): Index[] {
    return this.storage.get(dbName) || []
  }
}
