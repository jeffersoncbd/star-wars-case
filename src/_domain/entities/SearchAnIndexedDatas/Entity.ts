import { ServiceToIndexedDataSearch } from '../_services'

export class SearchAnIndexedDatas {
  constructor(private searcher: ServiceToIndexedDataSearch) {}

  async search(query: string, index: string) {
    return await this.searcher.search(query, index)
  }
}
