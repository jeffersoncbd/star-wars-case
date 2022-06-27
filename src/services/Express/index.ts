import express, { Express } from 'express'
import cors from 'cors'
import { router } from './routes'
import { errorsHandler } from './handlers/errors'

class ExpressServer {
  public expressServer: Express

  constructor() {
    this.expressServer = express()
    this.expressServer.use(express.json())
    this.expressServer.use(cors())
    this.expressServer.use(router)
    this.expressServer.use(errorsHandler)
  }

  start(): Promise<void> {
    return new Promise((resolve) => {
      const serverPort = process.env.PORT || 3001
      this.expressServer.listen(serverPort, () => {
        console.log(`[Express] Iniciado na porta ${serverPort}`)
        resolve()
      })
    })
  }
}

export const server = new ExpressServer()
