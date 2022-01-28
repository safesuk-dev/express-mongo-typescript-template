import * as UserController from '../user/controller'

import { Router } from 'express'

const router = Router()


router.get('/user', UserController.listUser)
router.post('/user',UserController.createUser)

export default router
