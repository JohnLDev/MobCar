import { Request, Response } from 'express'
import AddCarService from '../services/AddCarService'
import IndexCarService from '../services/IndexCarService'
import ShowCarService from '../services/ShowCarService'
import CalculateRentPriceService from '../services/CalculateRentPriceService'
import RentCarService from '../services/RentCarService'

export default {
  async AddCar(request: Request, response: Response): Promise<Response> {
    const { model, board, color, category, observations, url } = request.body
    const user_Id = request.user.id
    const addCarService = new AddCarService()
    const car = await addCarService.execute({
      model,
      board,
      color,
      category,
      observations,
      url,
      user_Id,
    })
    return response.status(201).json(car)
  },

  async Index(request: Request, response: Response): Promise<Response> {
    const { category, max, model, pag } = request.query
    const indexCarService = new IndexCarService()
    const cars = await indexCarService.execute({
      category: (category as unknown) as string,
      max: (max as unknown) as number,
      model: (model as unknown) as string,
      pag: pag as 'asc' | 'desc',
    })

    return response.status(200).json(cars)
  },

  async Show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showCarService = new ShowCarService()
    const cars = await showCarService.execute({
      id,
    })

    return response.status(200).json(cars)
  },

  async RentPrice(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { date_From, date_Until } = request.body
    const calculateRentPriceService = new CalculateRentPriceService()
    const price = await calculateRentPriceService.execute({
      id,
      date_From,
      date_Until,
    })

    return response.status(200).json(price)
  },

  async Rent(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { date_From, date_Until } = request.body
    const user_Id = request.user.id
    const rentCarService = new RentCarService()
    const price = await rentCarService.execute({
      id,
      date_From,
      date_Until,
      user_Id,
    })

    return response.status(200).json(price)
  },
}
