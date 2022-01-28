import {Request,Response,NextFunction} from 'express'
import { HttpError } from '../error'

export const errorMiddleware = (_error: Error, req: Request, res: Response, next: NextFunction) => {
    const error = _error as HttpError
    try {
      const status: number = error.status || 500
      const message: string = error.message || 'Something went wrong'
      console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
      return res.status(status).send({ message })
    } catch (error) {
      return next(error)
    }
  }
  