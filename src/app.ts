// import * as errorHandler from '@/middlewares/errorHandler';
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import expressJSDocSwagger from 'express-jsdoc-swagger'
import routes from './route'
import mongoDB from './mongo'
import swaggerOptions from './swagger'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/schema/schema.gql'
import resolvers from './resolvers'
import expressPlayground from 'graphql-playground-middleware-express'
const graphQLPlayground = expressPlayground
export const createApp = async (): Promise<express.Application> => {
  const app = express()
  expressJSDocSwagger(app)(swaggerOptions)

  // intialize database
  mongoDB.connect()

  app.use(cors())   
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers:resolvers,
    context: async () => null,
    formatResponse: (response) => {
      // const { query } = request.request
      // if(query) console.log(query)
      return response
    },
    formatError: error => {
      console.error(error)
      return error
    },
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app: app, cors: true, path: '/graphql' })
  app.get('/pg', graphQLPlayground({ endpoint: '/graphql'}))
  // API Routes
  app.use(routes)

  // Error Middleware
//   app.use(errorHandler.genericErrorHandler);
//   app.use(errorHandler.notFoundError);

  return app
}
