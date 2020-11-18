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
      id: yup.string().required('inform what car you want to rent'),
      user_Id: yup.string().required('Log in to rent a car'),
      date_From: yup
        .string()
        .length(10, 'inform a valid date')
        .required('inform the date that you want to get the car'),
      date_Until: yup
        .string()
        .length(10, 'inform a valid date')
        .required('inform the date that you will release the car'),
    })
    await schema.validate(data, { abortEarly: false })

    if (user_Id && !validate(user_Id)) {
      throw new AppError('Log in to rent a car')
    }

    const car = await this.carRepository.findById(parseInt(id))
    if (!car) {
      throw new AppError('Car not found', 404)
    }
    const [d1, m1, y1] = date_From.split('/')
    const [d2, m2, y2] = date_Until.split('/')
    if (
      d1.length !== 2 ||
      d2.length !== 2 ||
      m1.length !== 2 ||
      m2.length !== 2 ||
      y1.length !== 4 ||
      y2.length !== 4 ||
      parseInt(m1) > 12 ||
      parseInt(m2) > 12 ||
      parseInt(d1) > 31 ||
      parseInt(d2) > 31
    ) {
      throw new AppError('Invalid date format(dd/mm/yyyy)')
    }
    const { diffDays, DateF, DateU } = DiffDays({ date_From, date_Until })

    if (isBefore(DateU, DateF)) {
      throw new AppError('Invalid date')
    }
    if (
      isBefore(DateF, startOfHour(setHours(Date.now(), 0.0))) ||
      isBefore(DateU, startOfHour(setHours(Date.now(), 0.0))) ||
      isBefore(DateU, DateF)
    ) {
      throw new AppError('Invalid date')
    }

    car.rents.forEach(rent => {
      if (isEqual(DateF, rent.date_From) || isEqual(DateU, rent.date_Until)) {
        throw new AppError('Car is already rented at this time')
      }
      if (isBefore(DateF, rent.date_From) && isAfter(DateU, rent.date_Until)) {
        throw new AppError('Car is already rented at this time')
      }
      if (
        isBefore(DateF, rent.date_From) &&
        isBefore(DateU, rent.date_Until) &&
        isAfter(DateU, rent.date_From)
      ) {
        throw new AppError('Car is already rented at this time')
      }

      if (isAfter(DateF, rent.date_From) && isBefore(DateU, rent.date_Until)) {
        throw new AppError('Car is already rented at this time')
      }
      if (
        isAfter(DateF, rent.date_From) &&
        isBefore(DateF, rent.date_Until) &&
        isAfter(DateU, rent.date_Until)
      ) {
        throw new AppError('Car is already rented at this time')
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
