import { openSearchClient } from '../services/OpenSearch'
import { UnknownObject } from '../_domain/entities/_protocols'
import { IndexerService } from '../_domain/entities/_services'

export class IndexerAdapter implements IndexerService {
  async index(index: string, object: UnknownObject): Promise<void> {
    const { id, ...body } = object
    await openSearchClient.index({ id: id as string, index, body })
  }
}
