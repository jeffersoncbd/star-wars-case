import { SearchAnIndexedDatas } from '../../entities/SearchAnIndexedDatas'
import { ValidationError } from '../../entities/_errors/Validation'
import { IndexedData } from '../../entities/_services'

export class UseCaseForSearchInAllIndexedData {
  private indices = [
    'people',
    'planets',
    'films',
    'species',
    'vehicles',
    'starships'
  ]

  constructor(private searcher: SearchAnIndexedDatas) {}

  async search(query: string) {
    if (query.length <= 3) {
      throw new ValidationError('Termo de pesquisa muito curto.')
    }

    let data: IndexedData[] = []

    for (const indice of this.indices) {
      const newData = await this.searcher.search(query, indice)
      data = data.concat(newData)
    }

    return data
  }
}
