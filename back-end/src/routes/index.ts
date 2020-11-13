import { Router } from 'express'
import userRouter from './userRouter'
import carRouter from './carRouter'
const routes = Router()

routes.use('/user', userRouter)
routes.use('/car', carRouter)

export default routes
