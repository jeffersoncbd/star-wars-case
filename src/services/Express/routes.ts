import express from 'express'
import { adaptAnRequestHandlerFromControllerToCreateAnIndex } from './handlers/createAnIndex'
import { adaptAnRequestHandlerFromControllerToIndexAnEndpoint } from './handlers/indexAnEndpoint'

const router = express.Router()

router.post('/:context', adaptAnRequestHandlerFromControllerToCreateAnIndex())
router.post(
  '/:context/index',
  adaptAnRequestHandlerFromControllerToIndexAnEndpoint()
)

export { router }
