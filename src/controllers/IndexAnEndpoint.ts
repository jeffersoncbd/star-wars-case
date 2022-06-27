import { IndexApiEndpointUseCase } from '../_domain/usecases/IndexApiEndpoint'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexAnEndpoint implements Controller {
  constructor(private indexer: IndexApiEndpointUseCase) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const {
      params: { index },
      body: { endpoint, properties }
    } = httpRequest
    await this.indexer.index(endpoint, { index, properties })
  }
}
