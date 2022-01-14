import { Request, Response } from 'express'
import { CreatePhotoRequest } from '../model/photo'
import PhotoService from '../service/photo'


export const listPhoto = async (req: Request, res: Response) => {
  const result = await PhotoService.listPhoto()
  res.json(result)
}

export const createPhoto = async (req: Request, res: Response) => {
  const createPhotoReq:CreatePhotoRequest = req.body 
  const result = await  PhotoService.createPhoto(createPhotoReq)
  res.json(result)
}
