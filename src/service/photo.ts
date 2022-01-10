import {ListPhotoResponse} from '@/model/response'

/**
 * List books
 *
 * @returns {ListPhotoResponse}
 */
export const listPhoto = (): ListPhotoResponse => {
  return mockResponse()
}

function mockResponse():ListPhotoResponse{
    return {
        list:[
            {
                name:'photo-name-01'
            }
        ]
    }
}