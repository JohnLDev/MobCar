import AppError from '../errors/AppError'
import { inject, injectable } from 'tsyringe'
import ICarRepository from '../repositories/ICarRepository'
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  id: string
  user_Id: string
}

@injectable()
export default class DeleteCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id, user_Id }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_Id)
    if (!user || (user && !user.is_Adm)) {
      throw new AppError('você não tem permissão para deletar um carro')
    }
    const carExist = await this.carRepository.findOne(parseInt(id))

    if (!carExist) {
      throw new AppError('Carro não está cadastrado')
    }
    await this.carRepository.delete(parseInt(id))
  }
}
