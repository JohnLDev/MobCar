import IUpdateCarDTO from '../dtos/IUpdateCarDTO'
import Car from '../models/Car'
import * as yup from 'yup'
import AppError from '../errors/AppError'
import { inject, injectable } from 'tsyringe'
import ICarRepository from '../repositories/ICarRepository'

@injectable()
export default class UpdateCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    id,
    user_Id,
    board,
    category,
    color,
    model,
    observations,
    url,
  }: IUpdateCarDTO): Promise<Car> {
    const data = {
      id,
      user_Id,
      board,
      category,
      color,
      model,
      observations,
      url,
    }
    const schema = yup.object().shape({
      id: yup.string().required('Insira o identificador do carro'),
      user_Id: yup.string().required('Insira o identificador do usuario'),
      board: yup.string(),
      category: yup.string(),
      color: yup.string(),
      model: yup.string(),
      observations: yup.string(),
      url: yup.string().url(),
    })
    await schema.validate(data)

    const car = await this.carRepository.findById(parseInt(id))
    if (!car) {
      throw new AppError('Carro não cadastrado', 404)
    }
    if (board) {
      const boardAlreadyExists = await this.carRepository.findByBoard(board)

      if (boardAlreadyExists) {
        throw new AppError('Placa já registrada')
      }
      car.board = board
    }
    if (category) {
      category = category.toLocaleLowerCase() as 'padrao' | 'executivo' | 'vip'
      if (
        category !== 'padrao' &&
        category !== 'executivo' &&
        category !== 'vip'
      ) {
        throw new AppError('Categoria invalida (Padrao, Executivo, Vip)')
      }
      car.category = category
    }

    if (color) {
      car.color = color
    }

    if (model) {
      const AlreadyRegistered = await this.carRepository.findByModel(model)
      if (AlreadyRegistered) {
        car.category = AlreadyRegistered.category
      }
      car.model = model
    }
    if (observations) {
      car.observations = observations
    }
    if (url) {
      car.url = url
    }
    await this.carRepository.update(car)
    return car
  }
}
