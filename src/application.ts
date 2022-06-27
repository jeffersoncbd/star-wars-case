import 'dotenv/config'
import './services/OpenSearch'
import './services/SWapi'
import 'express-async-errors'
import { server } from './services/Express'

async function root() {
  await server.start()
}

root()
