import { ServiceToIndexedDataSearch } from '../_domain/entities/_services'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexedDataSearch implements Controller {
  constructor(private searcher: ServiceToIndexedDataSearch) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { index, query } = httpRequest.params
    const indexedData = await this.searcher.search(index, query)
    return { body: indexedData }
  }
}
