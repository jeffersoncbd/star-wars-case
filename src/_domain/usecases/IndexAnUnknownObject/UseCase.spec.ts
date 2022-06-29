import { MapAnUnknownObject } from '../../entities/MapAnUnknownObject'
import { ServiceToIndexData } from '../../entities/_services'
import { IndexAnUnknownObjectUseCase } from './UseCase'

class StubToIndexData implements ServiceToIndexData {
  async index(): Promise<void> {
    return undefined
  }
}

function makeSut() {
  const mapper = new MapAnUnknownObject()
  jest.spyOn(mapper, 'map').mockImplementation(() => ({}))
  const indexerStub = new StubToIndexData()
  const sut = new IndexAnUnknownObjectUseCase(mapper, indexerStub)
  return { sut, mapper, indexerStub }
}
const anyObject = { id: 1, name: 'any', any: 'any' }
const fakeProperties = ['id', 'name']
const fakeIndex = 'anyIndex'
const fakeType = 'anyType'

describe(IndexAnUnknownObjectUseCase.name, () => {
  test('deve mapear o objeto recebido com as propriedades informadas', async () => {
    const { sut, mapper } = makeSut()
    const mapSpy = jest.spyOn(mapper, 'map')
    await sut.index(anyObject, fakeProperties, fakeIndex, fakeType)
    expect(mapSpy).toHaveBeenCalledWith(anyObject, fakeProperties)
  })

  test('deve indexar os dados mapeados no indice informado', async () => {
    const { sut, mapper, indexerStub } = makeSut()
    jest.spyOn(mapper, 'map').mockReturnValue({ id: 1 })
    const indexSpy = jest.spyOn(indexerStub, 'index')
    await sut.index(anyObject, fakeProperties, fakeIndex, fakeType)
    expect(indexSpy).toHaveBeenCalledWith({ id: 1 }, fakeIndex, fakeType)
  })
})

export const makeIndexAnUnknownObjectStub = () => makeSut().sut
