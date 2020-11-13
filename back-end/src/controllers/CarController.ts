import { Request, Response } from 'express'
import AddCarService from '../services/AddCarService'

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
}
