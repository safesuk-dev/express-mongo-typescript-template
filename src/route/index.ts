import { Router } from 'express'
import PhotoRouter from './photo'

const router = Router()

const apiPrefix = '/api/v1'
router.use(apiPrefix,PhotoRouter)

export default router
