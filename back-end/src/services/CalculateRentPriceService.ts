import { getCustomRepository } from 'typeorm'
import * as yup from 'yup'
import DiffDays from '../utils/DiffDays'
import CarRepository from '../repositories/CarRepository'
import AppError from '../errors/AppError'

interface IResquet {
  id: string
  date_From: string
  date_Until: string
}
interface IResponse {
  price: number
  diffDays: number
}

export default class CalculateRentPriceService {
  private price = 0
  public async execute({
    id,
    date_From,
    date_Until,
  }: IResquet): Promise<IResponse> {
    const data = {
      id,
      date_From,
      date_Until,
    }
    const schema = yup.object().shape({
      id: yup.string().required('Informe o idenficador do carro'),
      date_From: yup
        .string()
        .length(10)
        .required('Informe a data que pegara o carro'),
      date_Until: yup
        .string()
        .length(10)
        .required('Informe a data que irá entregar o carro'),
    })

    await schema.validate(data, { abortEarly: false })

    const carRepository = getCustomRepository(CarRepository)

    const car = await carRepository.findById(parseInt(id))
    if (!car) {
      throw new AppError('Carro não cadastrado', 404)
    }

    switch (car.category) {
      case 'padrao':
        this.price = 99.99
        break
      case 'executivo':
        this.price = 199.99
        break
      case 'vip':
        this.price = 350
        break
      default:
        break
    }

    const diffDays = DiffDays({ date_From, date_Until })
    this.price = diffDays * this.price

    return { price: this.price, diffDays }
  }
}
