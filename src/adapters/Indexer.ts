import { openSearchClient } from '../services/OpenSearch'
import { UnknownObject } from '../_domain/entities/_protocols'
import { IndexerService } from '../_domain/entities/_services'

export class IndexerAdapter implements IndexerService {
  async index(index: string, body: UnknownObject): Promise<void> {
    await openSearchClient.index({ index, body })
  }
}
