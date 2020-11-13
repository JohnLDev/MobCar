import AppError from '../errors/AppError'
import { inject, injectable } from 'tsyringe'
import ICarRepository from '../repositories/ICarRepository'

interface IRequest {
  id: string
}

@injectable()
export default class DeleteCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const carExist = await this.carRepository.findOne(parseInt(id))

    if (!carExist) {
      throw new AppError('Carro não está cadastrado')
    }
    await this.carRepository.delete(parseInt(id))
  }
}
