import { Context } from '../graphql/contextType'
import {User} from '../generated/graphql'
import UserService from '../user/service'
import { HttpError } from '../error'

export async function listUser(_:unknown,_args:unknown,context:Context): Promise<User[]> {
    if(context.user==null){
        throw new HttpError(401, 'no token')
    }
    const resp = await UserService.listUser()
    return resp.list
}