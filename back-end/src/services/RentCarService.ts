import IRentCarDTO from '../dtos/IRentCarDTO'
import Rent from '../models/Rent'
import * as yup from 'yup'
import { validate } from 'uuid'
import AppError from '../errors/AppError'
import DiffDays from '../utils/DiffDays'
import GetRentPrice from '../utils/GetRentPrice'
import { isAfter, isBefore, isEqual, setHours, startOfHour } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import ICarRepository from '../repositories/ICarRepository'
import IRentRepository from '../repositories/IRentRepository'

@injectable()
export default class RentCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('RentRepository')
    private rentRepository: IRentRepository,
  ) {}

  public async execute({
    id,
    date_From,
    date_Until,
    user_Id,
  }: IRentCarDTO): Promise<Rent> {
    const data = {
      id,
      date_From,
      date_Until,
      user_Id,
    }

    const schema = yup.object().shape({
      id: yup.string().required('Informe qual carro deseja alugar'),
      user_Id: yup.string().required('Realize login para alugar um carro'),
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

    if (user_Id && !validate(user_Id)) {
      throw new AppError('Realize login para alugar um carro')
    }

    const car = await this.carRepository.findById(parseInt(id))
    if (!car) {
      throw new AppError('Carro não cadastrado', 404)
    }
    const { diffDays, DateF, DateU } = DiffDays({ date_From, date_Until })

    if (
      isBefore(DateF, startOfHour(setHours(Date.now(), 0.0))) ||
      isBefore(DateU, startOfHour(setHours(Date.now(), 0.0))) ||
      isBefore(DateU, DateF)
    ) {
      throw new AppError('Data inválida')
    }

    car.rents.forEach(rent => {
      if (isEqual(DateF, rent.date_From) || isEqual(DateU, rent.date_Until)) {
        throw new AppError('Carro está alugado durante esse periodo')
      }
      if (isBefore(DateF, rent.date_From) && isAfter(DateU, rent.date_Until)) {
        throw new AppError('Carro está alugado durante esse periodo')
      }
      if (
        isBefore(DateF, rent.date_From) &&
        isBefore(DateU, rent.date_Until) &&
        isAfter(DateU, rent.date_From)
      ) {
        throw new AppError('Carro está alugado durante esse periodo')
      }

      if (isAfter(DateF, rent.date_From) && isBefore(DateU, rent.date_Until)) {
        throw new AppError('Carro está alugado durante esse periodo')
      }
      if (
        isAfter(DateF, rent.date_From) &&
        isBefore(DateF, rent.date_Until) &&
        isAfter(DateU, rent.date_Until)
      ) {
        throw new AppError('Carro está alugado durante esse periodo')
      }
    })
    const categoryPrice = GetRentPrice(car.category)
    const price = diffDays * categoryPrice
    const rent = await this.rentRepository.create({
      id,
      user_Id,
      price,
      date_From: DateF,
      date_Until: DateU,
    })
    return rent
  }
}
