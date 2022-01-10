import * as express from 'express'

import { Server, createServer } from 'http'

const PORT = 3001

export const startServer = (app: express.Application): Server => {
  const httpServer = createServer(app)

  return httpServer.listen({ port: PORT}, (): void => {
    console.log(
      `🚀 LABNOTE-API Server ready at http://localhost:${PORT}\n`,
    )
  })
}
