export interface Photo {
    _id:string
    name:string
    url:string
}

export interface CreatePhotoRequest{
    name:string
    url:string
}

export interface PhotoResponseItem{
    id:string
    name:string
    url:string
}

export interface ListPhotoResponse{
    list:PhotoResponseItem[]
}