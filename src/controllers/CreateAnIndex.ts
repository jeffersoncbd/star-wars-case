import { Controller, HttpRequest, HttpResponse } from './protocol'
import { IndiceCreatorUsecase } from '../_domain/usecases/IndexCreator'

export class ControllerToCreateAnIndex implements Controller {
  constructor(private creator: IndiceCreatorUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<void | HttpResponse> {
    const { index } = httpRequest.body
    await this.creator.create(index)
  }
}
