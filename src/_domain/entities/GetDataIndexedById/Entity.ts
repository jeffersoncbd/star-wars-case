import { ServiceToGetDataIndexedById } from '../_services'

export class GetDataIndexedById {
  constructor(private service: ServiceToGetDataIndexedById) {}

  async getById(id: string, index: string) {
    return await this.service.getById(id, index)
  }
}
