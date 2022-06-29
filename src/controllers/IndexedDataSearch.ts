import { SearchAnIndexedDatas } from '../_domain/entities/SearchAnIndexedDatas'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexedDataSearch implements Controller {
  constructor(private searcher: SearchAnIndexedDatas) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { index, query } = httpRequest.params
    const indexedData = await this.searcher.search(query, index)
    return { body: indexedData }
  }
}
