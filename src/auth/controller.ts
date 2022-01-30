import { Request, Response } from 'express'
import { LoginRequest } from './model'
import AuthService from './service'

export const login = async (req: Request, res: Response) => {
  const request:LoginRequest = req.body 
  const result = await  AuthService.login(request)
  res.setHeader('Set-Cookie', result.cookie)
  res.status(200).json({ data: result.response, message: 'login' }).end()
}
