import { Router } from 'express'
import UserController from '../controllers/UserController'

const userRouter = Router()

userRouter.post('/signup', UserController.SignUp)
userRouter.post('/login', UserController.Login)

export default userRouter
