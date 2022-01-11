import {CreatePhotoRequest, ListPhotoResponse, Photo, PhotoResponseItem} from '../model/photo'
import photoRepository from '../repository/photo'
/**
 * List books
 *
 * @returns {ListPhotoResponse}
 */
export const listPhoto = async (): Promise<ListPhotoResponse> => {
  const listPhoto = await photoRepository.listPhoto()
  const list:PhotoResponseItem[] = listPhoto.map(i=>({
    name:i.name,
    url:i.url
  }))
  const response:ListPhotoResponse = {
      list
  }
  return response

}

export const createPhoto = async(createReq:CreatePhotoRequest): Promise<PhotoResponseItem> => {
    const newItem = await photoRepository.createPhoto(createReq)
    return {
      name:newItem.name,
      url:newItem.url
    }
}