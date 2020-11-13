import Car from '../models/Car'
import CreateCarDTO from '../dtos/ICreateCarDTO'
import * as yup from 'yup'
import CarRepository from '../database/repositories/CarRepository'
import UserRepository from '../database/repositories/UserRepository'
import AppError from '../errors/AppError'
import { getCustomRepository } from 'typeorm'

export default class AddCarService {
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
    }
    const schema = yup.object().shape({
      model: yup.string().required('Insira o modelo do carro'),
      board: yup.string().required('Insira a placa do carro'),
      color: yup.string().required('Insira a cor do carro'),
      category: yup.string().required('Insira categoria do carro'),
      observations: yup.string().required('Insira as observations do carro'),
      url: yup.string().url('Insira uma url válida'),
    })
    await schema.validate(data, { abortEarly: false })
    category = category.toLocaleLowerCase() as 'padrao' | 'executivo' | 'vip'
    if (
      category !== 'padrao' &&
      category !== 'executivo' &&
      category !== 'vip'
    ) {
      throw new AppError('Categoria invalida (Padrao, Executivo, Vip)')
    }
    const carRepository = getCustomRepository(CarRepository)
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(user_Id)
    if (!user) {
      throw new AppError(
        'Você deve realizar login antes de adicionar um carro',
        400,
      )
    }
    if (!user.is_Adm) {
      throw new AppError(
        'Você precisa ser um administrador para adicionar carros ao sistema',
      )
    }

    const boardAlreadyExists = await carRepository.findByBoard(board)

    if (boardAlreadyExists) {
      throw new AppError('Placa já registrada')
    }
    const AlreadyRegistered = await carRepository.findByModel(model)
    if (AlreadyRegistered) {
      data.category = AlreadyRegistered.category
    }
    const car = carRepository.create(data)
    await carRepository.save(car)
    return car
  }
}
