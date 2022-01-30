import { User } from '../user/model'
import { NextFunction,Request,Response } from 'express'
import AuthService from '../auth/service'
import {HttpError} from '../error'

export interface RequestWithUser extends Request {
    user: User;
}

export const authMiddlewareGQL = async (_req:Request) => {
  const req = _req as RequestWithUser
  try {
    const token = req.header('Authorization')? (req.header('Authorization')||'').split('Bearer ')[1]  : null
    if (token) {
      const findUser = await AuthService.check(token)
      if (findUser) {
        return findUser
      }
      return null
    }
  } catch (error) {
    const err = error as Error
    throw new HttpError(401, err.message)
  }
}

export const authMiddleware = async (_req: Request, res: Response, next: NextFunction) => {
  const req = _req as RequestWithUser
    try {
      const token = req.cookies['Authorization'] || (req.header('Authorization') ? req.cookies['Authorization'].split('Bearer ')[1] : null)
      if (token) {
        const findUser = await AuthService.check(token)
        if (findUser) {
          req.user = findUser
          next()
          return
        }
      }
    } catch (error) {
      const err = error as Error
      next(new HttpError(401, err.message))
      return
    }
    next(new HttpError(401, 'Authentication token missing'))
    return
  }