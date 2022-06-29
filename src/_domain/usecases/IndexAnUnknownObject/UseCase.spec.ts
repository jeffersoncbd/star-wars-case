import { MapAnUnknownObject } from '../../entities/MapAnUnknownObject'
import { IndexerService } from '../../entities/_services'
import { IndexAnUnknownObjectUseCase } from './UseCase'

class IndexerStub implements IndexerService {
  async index(): Promise<void> {
    return undefined
  }
}

function makeSut() {
  const mapper = new MapAnUnknownObject()
  const indexerStub = new IndexerStub()
  const sut = new IndexAnUnknownObjectUseCase(mapper, indexerStub)
  return { sut, mapper, indexerStub }
}
const anyObject = { id: 1, name: 'any', any: 'any' }
const fakeSettings = {
  index: 'anyIndex',
  type: 'anyType'
}
const fakeProperties = ['id', 'name']

describe(IndexAnUnknownObjectUseCase.name, () => {
  test('deve mapear o objeto com as propriedades definidas', async () => {
    const { sut, mapper } = makeSut()
    const mapSpy = jest.spyOn(mapper, 'map')
    await sut.index(anyObject, fakeProperties, fakeSettings)
    expect(mapSpy).toHaveBeenCalledWith(anyObject, fakeProperties)
  })

  test('deve indexar os dados mapeados no indice definido', async () => {
    const { sut, mapper, indexerStub } = makeSut()
    jest.spyOn(mapper, 'map').mockReturnValue({ id: 1 })
    const indexSpy = jest.spyOn(indexerStub, 'index')
    await sut.index(anyObject, fakeProperties, fakeSettings)
    expect(indexSpy).toHaveBeenCalledWith(
      { id: 1 },
      fakeSettings.index,
      fakeSettings.type
    )
  })
})

export const makeIndexAnUnknownObjectStub = () => makeSut().sut
