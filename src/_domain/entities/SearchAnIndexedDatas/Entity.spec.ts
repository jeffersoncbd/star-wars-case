import { IndexedData, ServiceToIndexedDataSearch } from '../_services'
import { SearchAnIndexedDatas } from './Entity'

class StubToIndexedDataSearch implements ServiceToIndexedDataSearch {
  async search(): Promise<IndexedData[]> {
    return []
  }
}

function makeSut() {
  const searcherStub = new StubToIndexedDataSearch()
  const sut = new SearchAnIndexedDatas(searcherStub)
  return { sut, searcherStub }
}
const fakeQuery = 'anyQuery'
const fakeIndex = 'anyIndex'

describe(SearchAnIndexedDatas.name, () => {
  test('deve no serviço de busca com os dados recebidos', async () => {
    const { sut, searcherStub } = makeSut()
    const searchSpy = jest.spyOn(searcherStub, 'search')
    await sut.search(fakeQuery, fakeIndex)
    expect(searchSpy).toHaveBeenCalledWith(fakeQuery, fakeIndex)
  })
})
