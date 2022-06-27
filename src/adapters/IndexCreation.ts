import { openSearchClient } from '../services/OpenSearch'
import { IndexCreationService } from '../_domain/entities/_services'

export class IndexCreationAdapter implements IndexCreationService {
  async create(index: string): Promise<void> {
    await openSearchClient.indices.create({ index })
  }
}
