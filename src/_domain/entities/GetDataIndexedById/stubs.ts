import { IndexedData, ServiceToGetDataIndexedById } from '../_services'
import { GetDataIndexedById } from './Entity'

export const fakeIndexedData: IndexedData = { id: '999', name: 'anyName' }

class StubToGetDataIndexedById implements ServiceToGetDataIndexedById {
  async getById(): Promise<IndexedData> {
    return fakeIndexedData
  }
}

export function makeSut() {
  const serviceStub = new StubToGetDataIndexedById()
  const sut = new GetDataIndexedById(serviceStub)
  return { sut, serviceStub }
}

export const makeGetDataIndexedByIdStub = () => makeSut().sut
