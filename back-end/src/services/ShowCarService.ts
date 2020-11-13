import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Car from '../models/Car'
import CarRepository from '../database/repositories/CarRepository'

interface IResquet {
  id: string
}

export default class ShowCarService {
  public async execute({ id }: IResquet): Promise<Car> {
    const correctId = parseInt(id)

    const carRepository = getCustomRepository(CarRepository)
    const car = await carRepository.findById(correctId)
    if (!car) {
      throw new AppError('Carro não cadastrado', 404)
    }
    return car
  }
}
