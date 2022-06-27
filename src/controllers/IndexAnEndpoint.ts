import { IndexApiEndpoint } from '../_domain/usecases/IndexApiEndpoint'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexAnEndpoint implements Controller {
  constructor(private indexer: IndexApiEndpoint) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const {
      params: { context },
      body: { endpoint, index, properties }
    } = httpRequest
    await this.indexer.index(endpoint, { context, index, properties })
  }
}
