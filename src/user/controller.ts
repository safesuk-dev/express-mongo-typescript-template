import { Request, Response } from 'express'
import { CreateUserRequest } from './model'
import UserService from './service'


export const listUser = async (req: Request, res: Response) => {
  const result = await UserService.listUser()
  res.json(result)
}

export const createUser = async (req: Request, res: Response) => {
  const request:CreateUserRequest = req.body 
  const result = await  UserService.createUser(request)
  res.json(result)
}
