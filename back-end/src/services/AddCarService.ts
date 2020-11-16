import Car from '../models/Car'
import CreateCarDTO from '../dtos/ICreateCarDTO'
import * as yup from 'yup'
import AppError from '../errors/AppError'
import ICarRepository from '../repositories/ICarRepository'
import { inject, injectable } from 'tsyringe'
import IUserRepository from '../repositories/IUserRepository'

@injectable()
export default class AddCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    model,
    board,
    color,
    category,
    observations,
    url,
    user_Id,
  }: CreateCarDTO): Promise<Car> {
    const data = {
      model,
      board,
      color,
      category,
      observations,
      url,
      user_Id,
    }
    const schema = yup.object().shape({
      model: yup.string().required('inform the car model'),
      board: yup.string().required('inform the license plate'),
      color: yup.string().required('infrom the color'),
      category: yup.string().required('inform car category'),
      observations: yup.string().required('inform some observation'),
      url: yup.string().url('inform an valid url'),
      user_Id: yup.string().required('insert user id'),
    })
    await schema.validate(data, { abortEarly: false })
    data.model = data.model.toLocaleLowerCase()
    data.category = data.category.toLocaleLowerCase() as typeof category
    if (
      data.category !== 'padrao' &&
      data.category !== 'executivo' &&
      data.category !== 'vip'
    ) {
      throw new AppError('Invalid category => (Padrao, Executivo, Vip)')
    }

    const user = await this.userRepository.findById(user_Id)
    if (!user) {
      throw new AppError('you must be logged in to add a car', 400)
    }
    if (!user.is_Adm) {
      throw new AppError('you must be an admin to add a car')
    }

    const boardAlreadyExists = await this.carRepository.findByBoard(board)

    if (boardAlreadyExists) {
      throw new AppError('license plate already registered')
    }
    const AlreadyRegistered = await this.carRepository.findByModel(model)
    if (AlreadyRegistered) {
      data.category = AlreadyRegistered.category
    }
    const car = await this.carRepository.create(data)
    return car
  }
}
