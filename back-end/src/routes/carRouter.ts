import { Router } from 'express'
import CarController from '../controllers/CarController'
import ensureAuthenticated from '../middlewares/ensureAuthenticate'

const carRouter = Router()

carRouter.get('/index', CarController.Index)
carRouter.get('/show/:id', CarController.Show)
carRouter.post('/addcar', ensureAuthenticated, CarController.AddCar)

export default carRouter
