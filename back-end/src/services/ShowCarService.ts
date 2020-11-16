import AppError from '../errors/AppError'
import Car from '../models/Car'
import { inject, injectable } from 'tsyringe'
import ICarRepository from '../repositories/ICarRepository'

interface IResquet {
  id: string
}

@injectable()
export default class ShowCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  public async execute({ id }: IResquet): Promise<Car> {
    const correctId = parseInt(id)

    const car = await this.carRepository.findById(correctId)
    if (!car) {
      throw new AppError('Car not found', 404)
    }
    return car
  }
}
