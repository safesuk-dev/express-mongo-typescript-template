import { model, Schema, Document } from 'mongoose'
import {CreatePhotoRequest, Photo} from '../model/photo'

const photoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
})

export const photoModel = model<Photo & Document>('Photo', photoSchema)

const listPhoto = async ():Promise<Photo[]>=>{
    const list:Photo[] = await photoModel.find()
    return list
}

const createPhoto = async (photoData:CreatePhotoRequest):Promise<Photo>=>{
    try{
        const photo = await photoModel.create({...photoData})
        return photo
    } catch(e) {
        console.error(e)
        return {} as Photo
    }
}

export default {
    listPhoto,
    createPhoto
}