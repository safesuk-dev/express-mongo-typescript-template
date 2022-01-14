import request from 'supertest'
import {createApp} from '../app'
import PhotoService from '../service/photo'
import db from '../mongo'
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500))
})

describe('PhotoRoute', () => {
  describe('[GET] /photo', () => {
    it('response statusCode 200', async() => {
        //mock
        const mockResp = {
            list:[
                {
                    id:'mockid',
                    name:'name',
                    url:'url'
                }
            ]
        }
        db.connect = jest.fn()
        PhotoService.listPhoto = jest.fn().mockResolvedValue(mockResp)
        const app = await createApp()
        const endpoint = '/api/v1/photo'
        const resp = await request(app).get(endpoint)

        expect(resp.statusCode).toEqual(200)
        return
    })
  })
})