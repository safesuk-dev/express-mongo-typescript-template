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
    name:string
    url:string
}

export interface ListPhotoResponse{
    list:PhotoResponseItem[]
}