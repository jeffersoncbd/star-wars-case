import { RequestHandler } from 'express'
import { ControllerOfResources } from '../../../controllers/Resources'
import { HttpResponse } from '../../../controllers/protocol'
import { UseCaseToGetTheFullDataOfAnId } from '../../../_domain/usecases/GetTheFullDataOfAnId/UseCase'
import { StarWarsApiAdapter } from '../../../adapters/StarWarsApi'
import { UseCaseToGetSubdataFromAnUrl } from '../../../_domain/usecases/GetSubDataFromAnUrl'
import { ExtractResourceFromSWApiURLs } from '../../../_domain/entities/ExtractResourceFromSWApiURLs'
import { ExtractIdFromSWApiURLs } from '../../../_domain/entities/ExtractIdFromSWApiURLs'
import { GetDataIndexedByIdInOpenSearch } from '../../../adapters/OpenSearch/GetDataIndexedById'
import { GetDataIndexedById } from '../../../_domain/entities/GetDataIndexedById'

export function convertControllerOfResourcesInAnExpressRequestHandler(): RequestHandler {
  const swApi = new StarWarsApiAdapter()
  const resourceExtractor = new ExtractResourceFromSWApiURLs()
  const idExtractor = new ExtractIdFromSWApiURLs()
  const openSearchIndexer = new GetDataIndexedByIdInOpenSearch()

  const indexer = new GetDataIndexedById(openSearchIndexer)
  const subData = new UseCaseToGetSubdataFromAnUrl(
    resourceExtractor,
    idExtractor,
    indexer
  )
  const fullData = new UseCaseToGetTheFullDataOfAnId(swApi, subData)
  const controller = new ControllerOfResources(fullData)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.status(200).json((controllerResponse as HttpResponse).body)
  }
}
