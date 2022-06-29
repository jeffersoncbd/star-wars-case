import { RequestHandler } from 'express'
import { IndexedDataSearchInOpenSearch } from '../../../adapters/OpenSearch'
import { ControllerToIndexedDataSearch } from '../../../controllers/IndexedDataSearch'
import { HttpResponse } from '../../../controllers/protocol'
import { SearchAnIndexedDatas } from '../../../_domain/entities/SearchAnIndexedDatas'

export function convertControllerToIndexedDataSearchInRequestHandler(): RequestHandler {
  const openSearchSearcher = new IndexedDataSearchInOpenSearch()
  const searcher = new SearchAnIndexedDatas(openSearchSearcher)
  const controller = new ControllerToIndexedDataSearch(searcher)
  return async (request, response) => {
    const controllerResponse = await controller.handle(request)
    return response.status(200).json((controllerResponse as HttpResponse).body)
  }
}
