import {Photo, MutationAddPhotoArgs} from '../generated/graphql'
import photoService from '../service/photo'

export const listPhoto = async() :Promise<Photo[]>=> {
    const resp =  await photoService.listPhoto()
    return resp.list
  }


export const addPhoto = async(_root:unknown, _args:MutationAddPhotoArgs)=>{
    const newPhoto:Photo = await photoService.createPhoto({
        name:_args.name||'',
        url:_args.url||''
    })
    return newPhoto
}