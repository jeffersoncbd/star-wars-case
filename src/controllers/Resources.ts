import { UseCaseToGetTheFullDataOfAnId } from '../_domain/usecases/GetTheFullDataOfAnId/UseCase'
import { Controller, HttpRequest, HttpResponse } from './protocol'

export class ControllerOfResources implements Controller {
  constructor(private fullData: UseCaseToGetTheFullDataOfAnId) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { resource, id } = httpRequest.params
    const body = await this.fullData.get(resource, id)
    return { body }
  }
}
