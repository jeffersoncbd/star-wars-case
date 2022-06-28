import { openSearchClient } from '../services/OpenSearch'
import {
  IndexedData,
  IndexedDataSearchService
} from '../_domain/entities/_services'

export class IndexedDataSearchAdapter implements IndexedDataSearchService {
  async search(index: string, query: string): Promise<IndexedData> {
    const body = {
      query: { query_string: { default_field: 'name', query: `*${query}*` } }
    }
    const openSearchResponse = await openSearchClient.search({ index, body })
    const resultList = openSearchResponse.body.hits.hits.map(
      (document: any) => {
        const urlParts = document._id.split('/')
        return {
          id: urlParts[urlParts.length - 2],
          name: document._source.name,
          type: document._index
        }
      }
    )
    return resultList
  }
}
