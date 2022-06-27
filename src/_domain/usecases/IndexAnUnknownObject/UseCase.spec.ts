import { MapTheObject } from '../../entities/MapTheObject'
import { IndexerService } from '../../entities/_services'
import { IndexAnUnknownObject } from './UseCase'

class IndexerStub implements IndexerService {
  async index(): Promise<void> {
    return undefined
  }
}

function makeSut() {
  const mapper = new MapTheObject()
  const indexerStub = new IndexerStub()
  const sut = new IndexAnUnknownObject(mapper, indexerStub)
  return { sut, mapper, indexerStub }
}
const anyObject = { id: 1, name: 'any', any: 'any' }
const fakeSettings = {
  context: 'any',
  index: 'any',
  properties: ['id', 'name']
}
export const makeIndexAnUnknownObjectStub = () => makeSut().sut

describe(IndexAnUnknownObject.name, () => {
  test('deve mapear o objeto com as propriedades definidas', async () => {
    const { sut, mapper } = makeSut()
    const mapSpy = jest.spyOn(mapper, 'map')
    await sut.index(anyObject, fakeSettings)
    expect(mapSpy).toHaveBeenCalledWith(anyObject, fakeSettings.properties)
  })

  test('deve indexar os dados mapeados no contexto e indice definidos', async () => {
    const { sut, mapper, indexerStub } = makeSut()
    jest.spyOn(mapper, 'map').mockReturnValue({ id: 1 })
    const indexSpy = jest.spyOn(indexerStub, 'index')
    await sut.index(anyObject, fakeSettings)
    expect(indexSpy).toHaveBeenCalledWith(
      `${fakeSettings.context}-${fakeSettings.index}`,
      { id: 1 }
    )
  })
})
