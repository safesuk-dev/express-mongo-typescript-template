import {CreatePhotoRequest, ListPhotoResponse, PhotoResponseItem} from '../model/photo'
import photoRepository from '../repository/photo'
/**
 * List books
 *
 * @returns {ListPhotoResponse}
 */
const listPhoto = async (): Promise<ListPhotoResponse> => {
  const listPhoto = await photoRepository.listPhoto()
  const list:PhotoResponseItem[] = listPhoto.map(i=>({
    id:i._id,
    name:i.name,
    url:i.url
  }))
  const response:ListPhotoResponse = {
      list
  }
  return response

}

const createPhoto = async(createReq:CreatePhotoRequest): Promise<PhotoResponseItem> => {
    const newItem = await photoRepository.createPhoto(createReq)
    return {
      id:newItem._id,
      name:newItem.name,
      url:newItem.url
    }
}


export default {
  listPhoto,
  createPhoto
}