import { fakeIndexedData } from '../../entities/GetDataIndexedById/stubs'
import { makeSut } from './stubs'
import { UseCaseToGetSubdataFromAnUrl } from './UseCase'

const fakeUrl = 'anyUrl'

describe(UseCaseToGetSubdataFromAnUrl.name, () => {
  test('deve extrair o recurso da url usando o extrator', async () => {
    const { sut, resourceExtractor } = makeSut()
    const extractSpy = jest.spyOn(resourceExtractor, 'extract')
    await sut.getByUrl(fakeUrl)
    expect(extractSpy).toHaveBeenCalledWith(fakeUrl)
  })

  test('deve extrair o ID da url usando o extrator', async () => {
    const { sut, idExtractor } = makeSut()
    const extractSpy = jest.spyOn(idExtractor, 'extract')
    await sut.getByUrl(fakeUrl)
    expect(extractSpy).toHaveBeenCalledWith(fakeUrl)
  })

  test('deve buscar os dados usando recurso e ID extraidos da URL', async () => {
    const { sut, indexedDataStub } = makeSut()
    const getByIdSpy = jest.spyOn(indexedDataStub, 'getById')
    await sut.getByUrl(fakeUrl)
    expect(getByIdSpy).toHaveBeenCalledWith('999', 'anyResource')
  })

  test('deve retornar os dados indexados do ID', async () => {
    const { sut } = makeSut()
    const data = await sut.getByUrl(fakeUrl)
    expect(data).toEqual(fakeIndexedData)
  })
})
