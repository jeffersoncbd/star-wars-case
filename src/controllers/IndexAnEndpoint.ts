import { UseCaseToIndexAnApiEndpoint } from '../_domain/usecases/IndexAnApiEndpoint'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexAnEndpoint implements Controller {
  constructor(private indexer: UseCaseToIndexAnApiEndpoint) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { name: index } = httpRequest.params
    const { endpoint, properties, type } = httpRequest.body
    await this.indexer.index(endpoint, properties, index, type)
  }
}
