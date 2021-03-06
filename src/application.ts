import 'dotenv/config'
import './services/OpenSearch'
import './services/SWapi'
import 'express-async-errors'
import { server } from './services/Express'

async function root() {
  try {
    await server.start()
  } catch (error) {
    console.log('[root]', new Date(), `\n${(error as any).stack}\n`)
  }
}

root()
