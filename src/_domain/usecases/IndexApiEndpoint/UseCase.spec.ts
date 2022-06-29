import { StarWarsApiService } from '../../entities/_services'
import { UnknownObject } from '../../entities/_protocols'
import { makeIndexAnUnknownObjectStub } from '../IndexAnUnknownObject/UseCase.spec'
import { IndexApiEndpointUseCase } from './UseCase'

class StarWarsApiStub implements StarWarsApiService {
  async get(): Promise<UnknownObject | UnknownObject[]> {
    return {}
  }
}

function makeSut() {
  const swApiStub = new StarWarsApiStub()
  const indexerStub = makeIndexAnUnknownObjectStub()
  jest.spyOn(indexerStub, 'index').mockImplementation(async () => undefined)
  const sut = new IndexApiEndpointUseCase(swApiStub, indexerStub)
  return { sut, swApiStub, indexerStub }
}
const fakeEndpoint = '/anyEndpoint'
const fakeProperties = ['any']
const fakeIndex = 'anyIndex'
const fakeType = 'anyType'

describe(IndexApiEndpointUseCase.name, () => {
  test('deve buscar os dados no endpoint informado', async () => {
    const { sut, swApiStub } = makeSut()
    const getSpy = jest.spyOn(swApiStub, 'get')
    await sut.index(fakeEndpoint, fakeProperties, fakeIndex, fakeType)
    expect(getSpy).toHaveBeenCalledWith(fakeEndpoint)
  })

  test('deve indexar somente um unico objeto caso o endpoint retorne um unico objeto', async () => {
    const { sut, indexerStub } = makeSut()
    const indexSpy = jest.spyOn(indexerStub, 'index')
    await sut.index(fakeEndpoint, fakeProperties, fakeIndex, fakeType)
    expect(indexSpy.mock.calls).toEqual([
      [{}, fakeProperties, fakeIndex, fakeType]
    ])
  })

  describe('deve indexar todos os objetos da lista caso o endpoint retorne uma', () => {
    test("lista com ID's", async () => {
      const { sut, swApiStub, indexerStub } = makeSut()
      const indexSpy = jest.spyOn(indexerStub, 'index')
      jest
        .spyOn(swApiStub, 'get')
        .mockImplementation(async () => [{ id: 1 }, { id: 2 }, { id: 3 }])
      await sut.index(fakeEndpoint, fakeProperties, fakeIndex, fakeType)
      expect(indexSpy.mock.calls).toEqual([
        [{ id: 1 }, fakeProperties, fakeIndex, fakeType],
        [{ id: 2 }, fakeProperties, fakeIndex, fakeType],
        [{ id: 3 }, fakeProperties, fakeIndex, fakeType]
      ])
    })

    test('lista com nomes', async () => {
      const { sut, swApiStub, indexerStub } = makeSut()
      const indexSpy = jest.spyOn(indexerStub, 'index')
      jest
        .spyOn(swApiStub, 'get')
        .mockImplementation(async () => [{ name: 'name1' }, { name: 'name2' }])
      await sut.index('any', fakeProperties, fakeIndex, fakeType)
      expect(indexSpy.mock.calls).toEqual([
        [{ name: 'name1' }, fakeProperties, fakeIndex, fakeType],
        [{ name: 'name2' }, fakeProperties, fakeIndex, fakeType]
      ])
    })
  })
})
