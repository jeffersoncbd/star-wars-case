import { ExtractIdFromSWApiURLs } from '../../entities/ExtractIdFromSWApiURLs'
import { ExtractResourceFromSWApiURLs } from '../../entities/ExtractResourceFromSWApiURLs'
import { makeGetDataIndexedByIdStub } from '../../entities/GetDataIndexedById/stubs'
import { UseCaseToGetSubdataFromAnUrl } from './UseCase'

export function makeSut() {
  const resourceExtractor = new ExtractResourceFromSWApiURLs()
  const idExtractor = new ExtractIdFromSWApiURLs()
  const indexedDataStub = makeGetDataIndexedByIdStub()
  jest
    .spyOn(resourceExtractor, 'extract')
    .mockImplementation(() => 'anyResource')
  jest.spyOn(idExtractor, 'extract').mockImplementation(() => '999')
  const sut = new UseCaseToGetSubdataFromAnUrl(
    resourceExtractor,
    idExtractor,
    indexedDataStub
  )
  return { sut, resourceExtractor, idExtractor, indexedDataStub }
}

export const makeGetSubdataFromAnUrlStub = () => makeSut().sut
