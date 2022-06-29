import { GetDataIndexedById } from './Entity'
import { fakeIndexedData, makeSut } from './stubs'

const fakeId = '999'
const fakeIndex = 'anyIndex'

describe(GetDataIndexedById.name, () => {
  test('deve buscar no serviço dados indexados pelo ID e indice informados', async () => {
    const { sut, serviceStub } = makeSut()
    const getByIdSpy = jest.spyOn(serviceStub, 'getById')
    await sut.getById(fakeId, fakeIndex)
    expect(getByIdSpy).toHaveBeenCalledWith(fakeId, fakeIndex)
  })

  test('deve retornar os dados encontrados pelo serviço', async () => {
    const { sut } = makeSut()
    const indexedData = await sut.getById(fakeId, fakeIndex)
    expect(indexedData).toEqual(fakeIndexedData)
  })
})
