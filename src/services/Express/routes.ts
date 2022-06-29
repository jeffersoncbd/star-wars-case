import express from 'express'
import { openSearchClient } from '../OpenSearch'
import { convertControllerToIndexedDataSearchInRequestHandler } from './handlers/indexedDataSearch'
import { convertControllerToIndexAnEndpointInRequestHandler } from './handlers/indexAnEndpoint'
import { convertControllerOfResourcesInAnExpressRequestHandler } from './handlers/resources'

const router = express.Router()

router.get(
  '/find/:index/:query',
  convertControllerToIndexedDataSearchInRequestHandler()
)
router.get(
  '/:resource/:id',
  convertControllerOfResourcesInAnExpressRequestHandler()
)

router.get('/indices', async (_, response) => {
  const openSearchResponse = await openSearchClient.cat.indices()
  return response.json(openSearchResponse.body.split('\n'))
})
router.post(
  '/indices/:name',
  convertControllerToIndexAnEndpointInRequestHandler()
)
router.delete('/indices/:name', async (request, response) => {
  await openSearchClient.indices.delete({ index: request.params.name })
  return response.send()
})

export { router }
