import * as UserController from '../user/controller'
import {authMiddleware} from '../middleware/auth.middleware'
import { Router } from 'express'

const router = Router()


router.get('/user',authMiddleware ,UserController.listUser)
router.post('/user',UserController.createUser)

export default router
