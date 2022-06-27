import { ApiService, UnknownObject } from '../../entities/_services'
import { IndexationSettings } from '../IndexAnUnknownObject'
import { makeIndexAnUnknownObjectStub } from '../IndexAnUnknownObject/UseCase.spec'
import { IndexApiEndpoint } from './UseCase'

class ApiStub implements ApiService {
  async get(): Promise<UnknownObject | UnknownObject[]> {
    return {}
  }
}

function makeSut() {
  const apiStub = new ApiStub()
  const indexerStub = makeIndexAnUnknownObjectStub()
  jest.spyOn(indexerStub, 'index').mockImplementation(async () => undefined)
  const sut = new IndexApiEndpoint(apiStub, indexerStub)
  return { sut, apiStub, indexerStub }
}
const fakeSettings: IndexationSettings = {
  context: 'context',
  index: 'index',
  properties: ['any']
}

describe(IndexApiEndpoint.name, () => {
  test('deve pegar os dados do endpoint informado', async () => {
    const { sut, apiStub } = makeSut()
    const getSpy = jest.spyOn(apiStub, 'get')
    await sut.index('any', fakeSettings)
    expect(getSpy).toHaveBeenCalledWith('any')
  })

  test('se o endpoint retornar um unico objeto, deve indexa-lo somente', async () => {
    const { sut, indexerStub } = makeSut()
    const indexSpy = jest.spyOn(indexerStub, 'index')
    await sut.index('any', fakeSettings)
    expect(indexSpy.mock.calls).toEqual([[{}, fakeSettings]])
  })

  describe('se o endpoint retornar uma lista de objetos, deve indexar cada um:', () => {
    test("lista de id's", async () => {
      const { sut, apiStub, indexerStub } = makeSut()
      const indexSpy = jest.spyOn(indexerStub, 'index')
      jest
        .spyOn(apiStub, 'get')
        .mockImplementation(async () => [{ id: 1 }, { id: 2 }, { id: 3 }])
      await sut.index('any', fakeSettings)
      expect(indexSpy.mock.calls).toEqual([
        [{ id: 1 }, fakeSettings],
        [{ id: 2 }, fakeSettings],
        [{ id: 3 }, fakeSettings]
      ])
    })

    test('lista de nomes', async () => {
      const { sut, apiStub, indexerStub } = makeSut()
      const indexSpy = jest.spyOn(indexerStub, 'index')
      jest
        .spyOn(apiStub, 'get')
        .mockImplementation(async () => [{ name: 'name1' }, { name: 'name2' }])
      await sut.index('any', fakeSettings)
      expect(indexSpy.mock.calls).toEqual([
        [{ name: 'name1' }, fakeSettings],
        [{ name: 'name2' }, fakeSettings]
      ])
    })
  })
})