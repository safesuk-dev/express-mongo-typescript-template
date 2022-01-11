import { Request, Response } from 'express'
import { CreatePhotoRequest } from '../model/photo'
import * as photoService from '../service/photo'

/**
 * Gets the API information.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const listPhoto = async (req: Request, res: Response) => {
  const result = await photoService.listPhoto()
  res.json(result)
}

export const createPhoto = async (req: Request, res: Response) => {
  const createPhotoReq:CreatePhotoRequest = req.body 
  const result = await  photoService.createPhoto(createPhotoReq)
  res.json(result)
}
