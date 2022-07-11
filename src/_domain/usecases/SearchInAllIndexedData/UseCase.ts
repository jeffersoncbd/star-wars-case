import { SearchAnIndexedDatas } from '../../entities/SearchAnIndexedDatas'
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
    let data: IndexedData[] = []

    for (const indice of this.indices) {
      const newData = await this.searcher.search(query, indice)
      data = data.concat(newData)
    }

    return data
  }
}
