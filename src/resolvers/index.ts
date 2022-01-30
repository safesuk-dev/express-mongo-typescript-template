import {Resolvers } from '../generated/graphql'
import { listPhoto, addPhoto } from './photo.resolver'
import {listUser} from './user.resolver'

const resolvers:Resolvers = {
    Query: {
       listPhoto,
       listUser
    },
    Mutation:{
      addPhoto
    }
  }

  export default resolvers