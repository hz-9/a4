import { EntityClassOrSchema } from '../interface'

/**
 * @public
 *
 * 用于托管 Entity 的存储空间。
 *
 */
export class EntitiesStorage {
  protected static readonly storage: Map<string, EntityClassOrSchema[]> = new Map<string, EntityClassOrSchema[]>()

  public static addEntitiesByDataSource(dbName: string, entities: EntityClassOrSchema[]): void {
    let collection = this.storage.get(dbName)
    if (!collection) {
      collection = []
      this.storage.set(dbName, collection)
    }
    entities.forEach((entity) => {
      if (collection!.includes(entity)) {
        return
      }
      collection!.push(entity)
    })
  }

  public static getEntitiesByDataSource(dbName: string): EntityClassOrSchema[] {
    return this.storage.get(dbName) || []
  }
}
