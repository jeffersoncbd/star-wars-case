import { ApiService } from '../../entities/_services'
import {
  IndexAnUnknownObject,
  IndexationSettings
} from '../IndexAnUnknownObject'

export class IndexApiEndpoint {
  constructor(private api: ApiService, private indexer: IndexAnUnknownObject) {}

  async index(endpoint: string, settings: IndexationSettings) {
    const response = await this.api.get(endpoint)
    if (Array.isArray(response)) {
      for (const object of response) {
        await this.indexer.index(object, settings)
      }
    } else {
      await this.indexer.index(response, settings)
    }
  }
}
