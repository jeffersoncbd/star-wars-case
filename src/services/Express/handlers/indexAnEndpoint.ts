import { RequestHandler } from 'express'
import { StarWarsApiAdapter } from '../../../adapters/StarWarsApi'
import { IndexDataInOpenSearch } from '../../../adapters/OpenSearch'
import { ControllerToIndexAnEndpoint } from '../../../controllers/IndexAnEndpoint'
import { MapAnUnknownObject } from '../../../_domain/entities/MapAnUnknownObject'
import { UseCaseToIndexAnUnknownObject } from '../../../_domain/usecases/IndexAnUnknownObject'
import { UseCaseToIndexAnApiEndpoint } from '../../../_domain/usecases/IndexAnApiEndpoint'
import { IndexAKnownObject } from '../../../_domain/entities/IndexAKnownObject'

export function convertControllerToIndexAnEndpointInRequestHandler(): RequestHandler {
  const mapper = new MapAnUnknownObject()
  const swApi = new StarWarsApiAdapter()
  const openSearchIndexer = new IndexDataInOpenSearch()

  const indexer = new IndexAKnownObject(openSearchIndexer)
  const unknownObjectIndexer = new UseCaseToIndexAnUnknownObject(
    mapper,
    indexer
  )

  const indexerEndpoint = new UseCaseToIndexAnApiEndpoint(
    swApi,
    unknownObjectIndexer
  )

  const controller = new ControllerToIndexAnEndpoint(indexerEndpoint)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.sendStatus(200).json(controllerResponse)
  }
}
