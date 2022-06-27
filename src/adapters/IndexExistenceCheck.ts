import { openSearchClient } from '../services/OpenSearch'
import { IndexExistenceCheckService } from '../_domain/entities/_services'

export class IndexExistenceCheckAdapter implements IndexExistenceCheckService {
  async check(index: string): Promise<boolean> {
    try {
      const response = await openSearchClient.cat.indices({ index })
      return response.statusCode === 200
    } catch (error) {
      return !((error as any).statusCode === 404)
    }
  }
}
