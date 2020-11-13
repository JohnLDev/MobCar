import { Router } from 'express'
import CarController from '../controllers/CarController'
import ensureAuthenticated from '../middlewares/ensureAuthenticate'

const carRouter = Router()

carRouter.get('/index', CarController.Index)
carRouter.get('/show/:id', CarController.Show)
carRouter.post('/addcar', ensureAuthenticated, CarController.AddCar)
carRouter.post('/update/:id', ensureAuthenticated, CarController.UpdateCar)
carRouter.post('/rentprice/:id', CarController.RentPrice)
carRouter.post('/rent/:id', ensureAuthenticated, CarController.Rent)
carRouter.delete('/delete/:id', ensureAuthenticated, CarController.Delete)

export default carRouter
