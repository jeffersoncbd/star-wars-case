import { RequestHandler } from 'express'
import { IndexedDataSearchAdapter } from '../../../adapters/IndexedDataSearch'
import { ControllerToIndexedDataSearch } from '../../../controllers/IndexedDataSearch'
import { HttpResponse } from '../../../controllers/protocol'

export function convertControllerToIndexedDataSearchInRequestHandler(): RequestHandler {
  const searcherAdapted = new IndexedDataSearchAdapter()
  const controller = new ControllerToIndexedDataSearch(searcherAdapted)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.status(200).json((controllerResponse as HttpResponse).body)
  }
}
