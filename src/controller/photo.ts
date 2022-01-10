import * as photoService from '@/service/photo'
import { Request, Response } from 'express'

/**
 * Gets the API information.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const listPhoto = (req: Request, res: Response) => {
  const result = photoService.listPhoto()
  res.json(result)
}
