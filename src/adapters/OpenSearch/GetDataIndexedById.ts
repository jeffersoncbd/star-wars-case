import {
  IndexedData,
  ServiceToGetDataIndexedById
} from '../../_domain/entities/_services'
import { openSearchClient } from '../../services/OpenSearch'

export class GetDataIndexedByIdInOpenSearch
  implements ServiceToGetDataIndexedById
{
  async getById(id: string, index: string): Promise<IndexedData> {
    const data = await openSearchClient.search({
      index,
      body: { query: { match: { _id: id } } }
    })
    return data.body.hits.hits[0]._source
  }
}
