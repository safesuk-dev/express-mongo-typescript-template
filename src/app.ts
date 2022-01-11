// import * as errorHandler from '@/middlewares/errorHandler';

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import expressJSDocSwagger from 'express-jsdoc-swagger'
import routes from './route'
import mongoDB from './mongo'
import swaggerOptions from './swagger'

export const createApp = (): express.Application => {
  const app = express()
  expressJSDocSwagger(app)(swaggerOptions)

  // intialize database
  mongoDB.connect()

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
  app.use(routes)

  // Error Middleware
//   app.use(errorHandler.genericErrorHandler);
//   app.use(errorHandler.notFoundError);

  return app
}
