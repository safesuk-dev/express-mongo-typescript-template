import * as AuthController from '../auth/controller'

import { Router } from 'express'

const router = Router()


router.post('/login', AuthController.login)

export default router
