import * as photoController from '../controller/photo'

import { Router } from 'express'

const router = Router()

/**
 * A photo type
 * @typedef {object} Photo
 * @property {string} name.required - The name of photo
 * @property {string} url.required - The url
 */

/**
 * GET /api/v1/photo
 * @summary This is the summary of the endpoint
 * @return {array<Photo>} 200 - success response - application/json
 */
router.get('/photo', photoController.listPhoto)

/**
 * POST /api/v1/photo
 * @param {Photo} request.body.required - photo info
 * @return {Photo} 200 - song response
 */
router.post('/photo',photoController.createPhoto)

export default router
