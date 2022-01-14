import PhotoRepository from '@/repository/photo'
import PhotoService from './photo'
describe('PhotoService', () => {
    describe('PhotoService.listPhoto',()=>{
        test('When list photo successfully', async () => {
            //mock
            const repositoryMockResult = [
                {
                    _id:'1',
                    name:'test-name',
                    url:'test-url',
                }
            ]
            PhotoRepository.listPhoto = jest.fn().mockResolvedValue((repositoryMockResult))
            
            const result =  await PhotoService.listPhoto()
            const expectResult = {
                list: [
                    {   
                        id:'1',
                        name:'test-name',
                        url:'test-url',
                    }
                ]
            }
            expect(result).toMatchObject(expectResult)
        })
    })
})