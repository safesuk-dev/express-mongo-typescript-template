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
import schema from './graphql/schema/schema.gql'
import userSchema from './graphql/schema/user.gql'
import resolvers from './resolvers'
import expressPlayground from 'graphql-playground-middleware-express'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error.middleware'
import {  authMiddlewareGQL } from './middleware/auth.middleware'
import { GraphQLError } from 'graphql'
import { GraphQLResponse } from 'apollo-server-express/node_modules/apollo-server-core'
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
  app.use(cookieParser())

  const apolloServer = new ApolloServer({
    typeDefs:[schema,userSchema],
    resolvers:resolvers,
    context: async ({ req }) => {
      try {
        const user = await authMiddlewareGQL(req)
        return { user }
      } catch (error) {
        console.log('error')
        const err = error as Error
        throw err
      }
    },
    formatResponse: (response: GraphQLResponse) => {
      // const { query } = request.request
      // if(query) console.log(query)
      return response
    },
    formatError: (error: GraphQLError) => {
      return error
    },
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app: app, cors: true, path: '/graphql' })
  app.get('/pg', graphQLPlayground({ endpoint: '/graphql'}))
  // API Routes
  app.use(routes)
  // Error Middleware
  app.use(errorMiddleware)
  return app
}
