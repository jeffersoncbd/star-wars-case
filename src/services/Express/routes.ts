import express from 'express'
import { adaptAnRequestHandlerFromControllerToCreateAnIndex } from './handlers/createAnIndex'

const router = express.Router()

router.post('/:context', adaptAnRequestHandlerFromControllerToCreateAnIndex())

export { router }
