import {Resolvers } from '../generated/graphql'
import { listPhoto, addPhoto } from './photo.resolver'

const resolvers:Resolvers = {
    Query: {
       listPhoto
    },
    Mutation:{
      addPhoto
    }
  }

  export default resolvers