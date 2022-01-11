import * as express from 'express'

import { Server, createServer } from 'http'
import CONFIG from './config'
const PORT = CONFIG.APP.PORT

export const startServer = (app: express.Application): Server => {
  const httpServer = createServer(app)

  return httpServer.listen({ port: PORT}, (): void => {
    console.log(
      `🎉 Server is listening at http://localhost:${PORT}\n`,
    )
  })
}
