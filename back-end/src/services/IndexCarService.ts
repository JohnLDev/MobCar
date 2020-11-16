import Car from '../models/Car'
import IIndexCarDTO from '../dtos/IIndexCarDTO'
import AppError from '../errors/AppError'
import { inject, injectable } from 'tsyringe'
import ICarRepository from '../repositories/ICarRepository'

@injectable()
export default class IndexCarService {
  private Cars: Car[] = []

  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    category,
    max,
    model,
    pag,
  }: IIndexCarDTO): Promise<Car[]> {
    this.Cars = await this.carRepository.findAll()

    if (category) {
      category = category.toLocaleLowerCase() as typeof category
      if (
        category !== 'vip' &&
        category !== 'padrao' &&
        category !== 'executivo'
      ) {
        throw new AppError('Invalid category => (Padrao, Executivo, Vip)')
      }
      this.Cars = this.Cars.filter(car => car.category === category)
    }
    if (model) {
      model = model.toLocaleLowerCase()
      this.Cars = this.Cars.filter(car => car.model === model)
    }
    if (max && this.Cars.length >= max) {
      this.Cars.length = max
    }

    if (pag) {
      if (pag !== 'asc' && pag !== 'desc') {
        throw new AppError('unknown filter')
      }
      switch (pag) {
        case 'asc':
          this.Cars = this.Cars.sort((a, b) => {
            return a.model > b.model ? 1 : b.model > a.model ? -1 : 0
          })
          break

        case 'desc':
          this.Cars = this.Cars.sort((a, b) => {
            return a.model < b.model ? 1 : b.model < a.model ? -1 : 0
          })
          break
      }
    }
    return this.Cars
  }
}
