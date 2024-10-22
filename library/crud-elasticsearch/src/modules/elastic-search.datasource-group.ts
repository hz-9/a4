import type { ElasticsearchClient } from '../plugin/elasticsearch_'

/**
 * @public
 */
export class ElasticSearchDataSourceGroup {
  public readonly options: Record<string, ElasticsearchClient>

  public constructor(options: Record<string, ElasticsearchClient>) {
    this.options = options
  }
}
