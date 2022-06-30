import { SearchAnIndexedDatas } from '../_domain/entities/SearchAnIndexedDatas'
import { UseCaseForSearchInAllIndexedData } from '../_domain/usecases/SearchInAllIndexedData/UseCase'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexedDataSearch implements Controller {
  constructor(
    private searcher: SearchAnIndexedDatas,
    private searcherGeneral: UseCaseForSearchInAllIndexedData
  ) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { index, query } = httpRequest.params
    let indexedData = []
    if (index === 'all') {
      indexedData = await this.searcherGeneral.search(query)
    } else {
      indexedData = await this.searcher.search(query, index)
    }
    return { body: indexedData }
  }
}
