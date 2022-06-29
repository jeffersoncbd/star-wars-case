import { idExtractorFromSWapisURLs } from '../../helpers/idExtractorFromSWapisURLs'
import { openSearchClient } from '../../services/OpenSearch'
import {
  IndexedData,
  ServiceToIndexedDataSearch
} from '../../_domain/entities/_services'

export class IndexedDataSearchInOpenSearch
  implements ServiceToIndexedDataSearch
{
  async search(index: string, query: string): Promise<IndexedData[]> {
    const body = {
      query: { query_string: { default_field: 'name', query: `*${query}*` } }
    }
    const openSearchResponse = await openSearchClient.search({ index, body })
    const resultList = openSearchResponse.body.hits.hits.map(
      (document: any) => {
        return {
          id: idExtractorFromSWapisURLs(document._id),
          name: document._source.name,
          type: document._index
        }
      }
    )
    return resultList
  }
}
