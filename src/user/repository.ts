import { hash } from '../util/crypt'
import { model, Schema } from 'mongoose'
import {CreateUserRequest, User} from './model'

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const userModel = model<User>('User', userSchema)

const listUser = async ():Promise<User[]>=>{
    const list:User[] = await userModel.find()
    return list
}

const createUser = async (data:CreateUserRequest):Promise<User>=>{
    try{
        const findUser: User|null = await userModel.findOne({ where: { email: data.email } })
        if (findUser) throw new Error(`email ${data.email} already exists`)

        const hashedPassword = await hash(data.password)
        const item = await userModel.create({...data,password:hashedPassword})
        return item
    } catch(e) {
        console.error(e)
        return {} as User
    }
}

const getUserByID = async (id:string):Promise<User|null>=>{
    try{
        const item:User|null = await userModel.findOne({where: { id: id } })
        if(!item){
            return null
        }
        return item
    } catch(e) {
        console.error(e)
        return {} as User
    }
}

const getUserByEmail = async (email:string):Promise<User|null>=>{
    try{
        const item:User|null = await userModel.findOne({where: { email: email } })
        if(!item){
            return null
        }
        return item
    } catch(e) {
        console.error(e)
        return null
    }
}

export default {
    createUser,
    listUser,
    getUserByID,
    getUserByEmail
}