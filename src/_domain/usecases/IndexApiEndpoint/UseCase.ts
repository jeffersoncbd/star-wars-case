import { StarWarsApiService } from '../../entities/_services'
import { IndexAnUnknownObjectUseCase } from '../IndexAnUnknownObject'

export class IndexApiEndpointUseCase {
  constructor(
    private swApi: StarWarsApiService,
    private indexer: IndexAnUnknownObjectUseCase
  ) {}

  async index(
    endpoint: string,
    properties: string[],
    index: string,
    type?: string
  ) {
    const response = await this.swApi.get(endpoint)
    if (Array.isArray(response)) {
      for (const object of response) {
        await this.indexer.index(object, properties, index, type)
      }
    } else {
      await this.indexer.index(response, properties, index, type)
    }
  }
}
