import { RequestHandler } from 'express'
import { StarWarsApiAdapter } from '../../../adapters/StarWarsApi'
import { IndexDataInOpenSearch } from '../../../adapters/OpenSearch'
import { ControllerToIndexAnEndpoint } from '../../../controllers/IndexAnEndpoint'
import { MapAnUnknownObject } from '../../../_domain/entities/MapAnUnknownObject'
import { IndexAnUnknownObjectUseCase } from '../../../_domain/usecases/IndexAnUnknownObject'
import { IndexApiEndpointUseCase } from '../../../_domain/usecases/IndexApiEndpoint'

export function convertControllerToIndexAnEndpointInRequestHandler(): RequestHandler {
  const mapper = new MapAnUnknownObject()
  const swApi = new StarWarsApiAdapter()
  const openSearchIndexer = new IndexDataInOpenSearch()

  const unknownObjectIndexer = new IndexAnUnknownObjectUseCase(
    mapper,
    openSearchIndexer
  )

  const indexerEndpoint = new IndexApiEndpointUseCase(
    swApi,
    unknownObjectIndexer
  )

  const controller = new ControllerToIndexAnEndpoint(indexerEndpoint)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.sendStatus(200).json(controllerResponse)
  }
}
