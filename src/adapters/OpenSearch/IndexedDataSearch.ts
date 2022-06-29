import { openSearchClient } from '../../services/OpenSearch'
import {
  IndexedData,
  ServiceToIndexedDataSearch
} from '../../_domain/entities/_services'

export class IndexedDataSearchInOpenSearch
  implements ServiceToIndexedDataSearch
{
  async search(query: string, index: string): Promise<IndexedData[]> {
    const body = {
      query: { query_string: { default_field: 'name', query: `*${query}*` } }
    }
    const openSearchResponse = await openSearchClient.search({ index, body })
    return openSearchResponse.body.hits.hits.map((hit: any) => hit._source)
  }
}
