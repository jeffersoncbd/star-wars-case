import { StarWarsApiService } from '../../entities/_services'
import { UseCaseToIndexAnUnknownObject } from '../IndexAnUnknownObject'

export class UseCaseToIndexAnApiEndpoint {
  constructor(
    private swApi: StarWarsApiService,
    private indexer: UseCaseToIndexAnUnknownObject
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
