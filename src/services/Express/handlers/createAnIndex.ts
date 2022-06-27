import { RequestHandler } from 'express'
import { IndexCreationAdapter } from '../../../adapters/IndexCreation'
import { IndexExistenceCheckAdapter } from '../../../adapters/IndexExistenceCheck'
import { ControllerToCreateAnIndex } from '../../../controllers/CreateAnIndex'
import { IndiceCreatorUsecase } from '../../../_domain/usecases/IndexCreator'

export function adaptAnRequestHandlerFromControllerToCreateAnIndex(): RequestHandler {
  const checkerAdapted = new IndexExistenceCheckAdapter()
  const creatorAdapted = new IndexCreationAdapter()
  const creator = new IndiceCreatorUsecase(checkerAdapted, creatorAdapted)
  const controller = new ControllerToCreateAnIndex(creator)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.sendStatus(201).json(controllerResponse)
  }
}
