import { makeIndexAKnownObjectStub } from '../../entities/IndexAKnownObject/Entity.spec'
import { MapAnUnknownObject } from '../../entities/MapAnUnknownObject'
import { UseCaseToIndexAnUnknownObject } from './UseCase'

function makeSut() {
  const mapper = new MapAnUnknownObject()
  const indexer = makeIndexAKnownObjectStub()
  jest.spyOn(mapper, 'map').mockImplementation(() => ({}))
  jest.spyOn(indexer, 'index').mockImplementation(async () => undefined)
  const sut = new UseCaseToIndexAnUnknownObject(mapper, indexer)
  return { sut, mapper, indexer }
}
const anyObject = { id: 1, name: 'any', any: 'any' }
const fakeProperties = ['id', 'name']
const fakeIndex = 'anyIndex'
const fakeType = 'anyType'

export const makeIndexAnUnknownObjectStub = () => makeSut().sut

describe(UseCaseToIndexAnUnknownObject.name, () => {
  test('deve mapear o objeto recebido com as propriedades informadas', async () => {
    const { sut, mapper } = makeSut()
    const mapSpy = jest.spyOn(mapper, 'map')
    await sut.index(anyObject, fakeProperties, fakeIndex, fakeType)
    expect(mapSpy).toHaveBeenCalledWith(anyObject, fakeProperties)
  })

  test('deve indexar os dados mapeados no indice informado', async () => {
    const { sut, mapper, indexer } = makeSut()
    jest.spyOn(mapper, 'map').mockReturnValue({ id: 1 })
    const indexSpy = jest.spyOn(indexer, 'index')
    await sut.index(anyObject, fakeProperties, fakeIndex, fakeType)
    expect(indexSpy).toHaveBeenCalledWith({ id: 1 }, fakeIndex, fakeType)
  })
})
