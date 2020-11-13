import { Router } from 'express'
import CarController from '../controllers/CarController'

const carRouter = Router()

carRouter.post('/addcar', CarController.AddCar)

export default carRouter
