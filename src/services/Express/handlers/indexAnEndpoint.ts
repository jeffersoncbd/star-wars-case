import { RequestHandler } from 'express'
import { ApiAdapter } from '../../../adapters/Api'
import { IndexerAdapter } from '../../../adapters/Indexer'
import { ControllerToIndexAnEndpoint } from '../../../controllers/IndexAnEndpoint'
import { MapTheObject } from '../../../_domain/entities/MapTheObject'
import { IndexAnUnknownObjectUseCase } from '../../../_domain/usecases/IndexAnUnknownObject'
import { IndexApiEndpointUseCase } from '../../../_domain/usecases/IndexApiEndpoint'

export function adaptAnRequestHandlerFromControllerToIndexAnEndpoint(): RequestHandler {
  const mapper = new MapTheObject()
  const apiAdapted = new ApiAdapter()
  const indexerAdapted = new IndexerAdapter()
  const indexerAnUnknownObject = new IndexAnUnknownObjectUseCase(
    mapper,
    indexerAdapted
  )
  const indexer = new IndexApiEndpointUseCase(
    apiAdapted,
    indexerAnUnknownObject
  )
  const controller = new ControllerToIndexAnEndpoint(indexer)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.sendStatus(200).json(controllerResponse)
  }
}
