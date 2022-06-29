import { IndexApiEndpointUseCase } from '../_domain/usecases/IndexApiEndpoint'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexAnEndpoint implements Controller {
  constructor(private indexer: IndexApiEndpointUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { name: index } = httpRequest.params
    const { endpoint, properties, type } = httpRequest.body
    await this.indexer.index(endpoint, properties, index, type)
  }
}
