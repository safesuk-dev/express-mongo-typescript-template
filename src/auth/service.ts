import { DataStoredInToken, LoginRequest, TokenData } from './model'
import CONFIG from '../config'
import { User } from '../user/model'
import { sign, verify } from 'jsonwebtoken'
import UserRepository from '../user/repository'
import { compare } from '../util/crypt'
import { HttpError } from '../error'
import { isEmpty } from '../util'

const createToken =  (user: User): TokenData => {
    const dataStoredInToken: DataStoredInToken = { id: user._id }
    const secretKey: string = CONFIG.AUTH.SECRET_KEY
    const expiresIn: number = 60 * 60

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) }
}

const createCookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
}
const login = async (request:LoginRequest): Promise<{ cookie: string; findUser: User,tokenData:TokenData }> => {
    if (isEmpty(request)) throw new HttpError(400, 'You\'re not userData')

    const findUser: User|null = await UserRepository.getUserByEmail(request.email)
    if (!findUser) throw Error('not found')
    new HttpError(409, `You're email ${request.email} not found`)

    const isPasswordMatching: boolean = await compare(request.password, findUser.password)
    if (!isPasswordMatching) throw Error('password not matching')
     new HttpError(409, 'You\'re password not matching')

    const tokenData = createToken(findUser)
    const cookie = createCookie(tokenData)

    return { cookie, findUser,tokenData }
}

const check =  async (token:string):Promise<User> => {
        const secretKey: string = CONFIG.AUTH.SECRET_KEY
        const verificationResponse = (await verify(token, secretKey)) as DataStoredInToken
        const userId = verificationResponse.id
        const findUser = await UserRepository.getUserByID(userId)
        if (findUser) {
          return findUser
        } else {
         throw new Error('Wrong authentication token')
        }
  }
  

export default {
    createToken,
    createCookie,
    login,
    check
}