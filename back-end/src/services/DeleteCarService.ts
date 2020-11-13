import CarRepository from '../database/repositories/CarRepository'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'

interface IRequest {
  id: string
}

export default class DeleteCarService {
  public async execute({ id }: IRequest): Promise<void> {
    const carRepository = getCustomRepository(CarRepository)
    const carExist = await carRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!carExist) {
      throw new AppError('Carro não está cadastrado')
    }
    await carRepository.delete(carExist)
  }
}
