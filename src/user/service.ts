import {CreateUserRequest, ListUserResponse, UserItemResponse} from './model'
import userRepository from './repository'
/**
 * List books
 *
 * @returns {ListPhotoResponse}
 */
const listUser = async (): Promise<ListUserResponse> => {
  const listUser = await userRepository.listUser()
  const list:UserItemResponse[] = listUser.map(i=>({
    id:i._id,
    email:i.email
  }))
  const response:ListUserResponse = {
      list
  }
  return response

}

const createUser = async(createReq:CreateUserRequest): Promise<UserItemResponse> => {
    const newItem = await userRepository.createUser(createReq)
    return {
      id:newItem._id,
     email:newItem.email
    }
}


export default {
    listUser,
    createUser
}