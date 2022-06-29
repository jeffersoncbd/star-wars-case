import { ServiceToGetDataIndexedById } from '../_services'

export class GetDataIndexedById {
  constructor(private service: ServiceToGetDataIndexedById) {}

  getById(id: string, index: string) {
    return this.service.getById(id, index)
  }
}
