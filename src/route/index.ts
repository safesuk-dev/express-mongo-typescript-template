import { Router } from 'express'
import PhotoRouter from './photo'
import UserRouter from './user'
import AuthRouter from './auth'

const router = Router()

const apiPrefix = '/api/v1'

router.use(apiPrefix, PhotoRouter)
router.use(apiPrefix, UserRouter)
router.use(apiPrefix, AuthRouter)

export default router
