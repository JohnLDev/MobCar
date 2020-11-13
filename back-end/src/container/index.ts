import { container } from 'tsyringe'

import IUserRepository from '../repositories/IUserRepository'
import UserRepository from '../database/repositories/UserRepository'

import ICarRepository from '../repositories/ICarRepository'
import CarRepository from '../database/repositories/CarRepository'

import IRentRepository from '../repositories/IRentRepository'
import RentRepository from '../database/repositories/RentRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<ICarRepository>('CarRepository', CarRepository)
container.registerSingleton<IRentRepository>('RentRepository', RentRepository)
