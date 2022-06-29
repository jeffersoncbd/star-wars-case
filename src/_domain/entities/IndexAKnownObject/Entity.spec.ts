import { ServiceToIndexData } from '../_services'
import { IndexAKnownObject } from './Entity'

class StubToIndexData implements ServiceToIndexData {
  async index(): Promise<void> {
    return undefined
  }
}

function makeSut() {
  const indexerStub = new StubToIndexData()
  const sut = new IndexAKnownObject(indexerStub)
  return { sut, indexerStub }
}
const fakeObject = { id: 1, name: 'any' }
const fakeIndex = 'anyIndex'
const fakeType = 'anyType'

export const makeIndexAKnownObjectStub = () => makeSut().sut

describe(IndexAKnownObject.name, () => {
  test('deve indexar o objeto recebido usando o serviço de indexação', async () => {
    const { sut, indexerStub } = makeSut()
    const indexSpy = jest.spyOn(indexerStub, 'index')
    await sut.index(fakeObject, fakeIndex, fakeType)
    expect(indexSpy).toHaveBeenCalledWith(fakeObject, fakeIndex, fakeType)
  })
})
