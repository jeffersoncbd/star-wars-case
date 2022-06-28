import express from 'express'
import { openSearchClient } from '../OpenSearch'
import { convertControllerToIndexAnEndpointInRequestHandler } from './handlers/indexAnEndpoint'

const router = express.Router()

router.get('/find/:index/:query', async (request, response) => {
  const { index, query } = request.params
  const body = { query: { match: { name: { query } } } }
  const openSearchResponse = await openSearchClient.search({ index, body })
  const resultList = openSearchResponse.body.hits.hits.map((document: any) => {
    const urlParts = document._id.split('/')
    return {
      id: urlParts[urlParts.length - 2],
      name: document._source.name,
      type: document._index
    }
  })
  return response.json(resultList)
})

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
