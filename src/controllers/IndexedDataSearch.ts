import { SearchAnIndexedDatas } from '../_domain/entities/SearchAnIndexedDatas'
import { ValidationError } from '../_domain/entities/_errors/Validation'
import { UseCaseForSearchInAllIndexedData } from '../_domain/usecases/SearchInAllIndexedData/UseCase'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerToIndexedDataSearch implements Controller {
  constructor(
    private searcher: SearchAnIndexedDatas,
    private searcherGeneral: UseCaseForSearchInAllIndexedData
  ) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { index, query } = httpRequest.params

    if (query.length < 2) {
      throw new ValidationError('Termo de pesquisa muito curto.')
    }

    let indexedData = []
    if (index === 'all') {
      indexedData = await this.searcherGeneral.search(query)
    } else {
      indexedData = await this.searcher.search(query, index)
    }
    return { body: indexedData }
  }
}
