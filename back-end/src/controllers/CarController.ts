import { Request, Response } from 'express'
import AddCarService from '../services/AddCarService'
import IndexCarService from '../services/IndexCarService'
import ShowCarService from '../services/ShowCarService'
import CalculateRentPriceService from '../services/CalculateRentPriceService'
import RentCarService from '../services/RentCarService'
import DeleteCarService from '../services/DeleteCarService'
import UpdateCarService from '../services/UpdateCarService'
import { container } from 'tsyringe'

export default {
  async AddCar(request: Request, response: Response): Promise<Response> {
    const { model, board, color, category, observations, url } = request.body
    const user_Id = request.user.id
    const addCarService = container.resolve(AddCarService)
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

  async UpdateCar(request: Request, response: Response): Promise<Response> {
    const { model, board, color, category, observations, url } = request.body
    const user_Id = request.user.id
    const { id } = request.params
    const updateCarService = container.resolve(UpdateCarService)
    const car = await updateCarService.execute({
      model,
      id,
      board,
      color,
      category,
      observations,
      url,
      user_Id,
    })
    return response.status(200).json(car)
  },

  async Index(request: Request, response: Response): Promise<Response> {
    const { category, max, model, pag } = request.query
    const indexCarService = container.resolve(IndexCarService)
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
    const showCarService = container.resolve(ShowCarService)
    const cars = await showCarService.execute({
      id,
    })

    return response.status(200).json(cars)
  },

  async RentPrice(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { date_From, date_Until } = request.body
    const calculateRentPriceService = container.resolve(
      CalculateRentPriceService,
    )
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
    const rentCarService = container.resolve(RentCarService)
    const price = await rentCarService.execute({
      id,
      date_From,
      date_Until,
      user_Id,
    })

    return response.status(200).json(price)
  },

  async Delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const user_Id = request.user.id
    const deleteCarService = container.resolve(DeleteCarService)
    await deleteCarService.execute({
      id,
      user_Id,
    })

    return response.status(200).json({ message: 'Deletado com sucesso' })
  },
}
