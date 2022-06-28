import { ApiService } from '../../entities/_services'
import {
  IndexAnUnknownObjectUseCase,
  IndexationSettings
} from '../IndexAnUnknownObject'

export class IndexApiEndpointUseCase {
  constructor(
    private api: ApiService,
    private indexer: IndexAnUnknownObjectUseCase
  ) {}

  async index(
    endpoint: string,
    properties: string[],
    settings: IndexationSettings
  ) {
    const response = await this.api.get(endpoint)
    if (Array.isArray(response)) {
      for (const object of response) {
        await this.indexer.index(object, properties, settings)
      }
    } else {
      await this.indexer.index(response, properties, settings)
    }
  }
}
