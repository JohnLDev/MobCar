import Car from '../models/Car'
import IIndexCarDTO from '../dtos/IIndexCarDTO'
import { getCustomRepository } from 'typeorm'
import CarRepository from '../repositories/CarRepository'
import AppError from '../errors/AppError'

export default class IndexCarService {
  private Cars: Car[] = []
  public async execute({
    category,
    max,
    model,
    pag,
  }: IIndexCarDTO): Promise<Car[]> {
    const carRepository = getCustomRepository(CarRepository)
    this.Cars = await carRepository.find()

    if (category) {
      this.Cars = this.Cars.filter(car => car.category === category)
    }
    if (model) {
      this.Cars = this.Cars.filter(car => car.model === model)
    }
    if (max) {
      this.Cars.length = max
    }

    if (pag) {
      if (pag !== 'asc' && pag !== 'desc') {
        throw new AppError('Filtro Desconhecido')
      }
      if (pag === 'asc') {
        this.Cars.sort((a, b) => {
          return a.model > b.model ? 1 : b.model > a.model ? -1 : 0
        })
      }
      if (pag === 'desc') {
        this.Cars.sort((a, b) => {
          return a.model < b.model ? 1 : b.model < a.model ? -1 : 0
        })
      }
    }
    return this.Cars
  }
}
