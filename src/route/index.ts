import * as photoController from '@/controller/photo'

import { Router } from 'express'

const router = Router()

router.get('/photo', photoController.listPhoto)

export default router
