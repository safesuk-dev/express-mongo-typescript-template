// import * as errorHandler from '@/middlewares/errorHandler';

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from '@/route'

export const createApp = (): express.Application => {
  const app = express()

  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  // API Routes
  app.use('/api/v1', routes)

  // Error Middleware
//   app.use(errorHandler.genericErrorHandler);
//   app.use(errorHandler.notFoundError);

  return app
}
