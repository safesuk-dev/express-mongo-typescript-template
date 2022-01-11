import * as photoController from '../controller/photo'

import { Router } from 'express'

const router = Router()

router.get('/photo', photoController.listPhoto)
router.post('/photo',photoController.createPhoto)

export default router
