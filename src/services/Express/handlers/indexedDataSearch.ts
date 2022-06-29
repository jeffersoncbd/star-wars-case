import { RequestHandler } from 'express'
import { IndexedDataSearchInOpenSearch } from '../../../adapters/OpenSearch'
import { ControllerToIndexedDataSearch } from '../../../controllers/IndexedDataSearch'
import { HttpResponse } from '../../../controllers/protocol'

export function convertControllerToIndexedDataSearchInRequestHandler(): RequestHandler {
  const openSearchSearcher = new IndexedDataSearchInOpenSearch()
  const controller = new ControllerToIndexedDataSearch(openSearchSearcher)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.status(200).json((controllerResponse as HttpResponse).body)
  }
}
