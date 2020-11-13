import { Request, Response } from 'express'
import AddCarService from '../services/AddCarService'
import IndexCarService from '../services/IndexCarService'

export default {
  async AddCar(request: Request, response: Response): Promise<Response> {
    const { model, board, color, category, observations, url } = request.body
    const addCarService = new AddCarService()
    const car = await addCarService.execute({
      model,
      board,
      color,
      category,
      observations,
      url,
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
}
