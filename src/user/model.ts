type baseUser =  {
    email:string
    password:string
}

export interface User extends baseUser{
    _id : string
}

export interface UserItemResponse {
    id:string
    email: string
}

export interface ListUserResponse  {
    list:UserItemResponse[]
}

export type CreateUserRequest = baseUser