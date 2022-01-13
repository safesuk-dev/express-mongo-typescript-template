import {Photo, MutationAddPhotoArgs} from '../generated/graphql'
import photoRepository from '../repository/photo'

export const listPhoto = async()=> {
    const list =  await photoRepository.listPhoto()
    const resp:Photo[] = list.map(i=>({
        id:i._id,
        url:i.url,
        name:i.name
    }))
    return resp
  }


export const addPhoto = async(_root:unknown, _args:MutationAddPhotoArgs)=>{
    const newPhoto = await photoRepository.createPhoto({
        name:_args.name||'',
        url:_args.url||''
    })
    const result:Photo = {
        url:newPhoto.url,
        name:newPhoto.name,
        id:newPhoto._id
    }
    return result
}