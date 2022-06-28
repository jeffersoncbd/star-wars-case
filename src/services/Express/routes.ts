import express from 'express'
import { openSearchClient } from '../OpenSearch'
import { adaptAnRequestHandlerFromControllerToCreateAnIndex } from './handlers/createAnIndex'
import { adaptAnRequestHandlerFromControllerToIndexAnEndpoint } from './handlers/indexAnEndpoint'

const router = express.Router()

router.get('/indices/:name/:query', async (request, response) => {
  const { name, query } = request.params
  const openSearchResponse = await openSearchClient.search({
    index: name,
    body: { query: { match: { name: { query } } } }
  })

  return response.json(openSearchResponse.body)
})

router.get('/indices', async (_, response) => {
  const openSearchResponse = await openSearchClient.cat.indices()
  return response.json(openSearchResponse.body.split('\n'))
})
router.post('/indices', adaptAnRequestHandlerFromControllerToCreateAnIndex())
router.patch(
  '/indices/:name',
  adaptAnRequestHandlerFromControllerToIndexAnEndpoint()
)
router.delete('/indices/:name', async (request, response) => {
  await openSearchClient.indices.delete({ index: request.params.name })
  return response.send()
})

export { router }
