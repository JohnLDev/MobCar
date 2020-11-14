import CreateCarDTO from '../dtos/ICreateCarDTO'
import * as yup from 'yup'
import { v4 } from 'uuid'
import AppError from '../errors/AppError'
import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import AddCarService from './AddCarService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'

describe('AddCarService', () => {
  it('should be able to create a car', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const car = await addCarService.execute({
      model: 'camaro',
      board: 'ick9090',
      category: 'vip',
      color: 'black',
      user_Id: v4(),
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    expect(car).toHaveProperty('id')
  })
  it('should be not able to create a user with an already registered email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    await addCarService.execute({
      model: 'camaro',
      board: 'ick9090',
      category: 'vip',
      color: 'black',
      user_Id: v4(),
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })

    expect(
      await addCarService.execute({
        model: 'camaro',
        board: 'ick9090',
        category: 'vip',
        color: 'black',
        user_Id: v4(),
        observations: 'vidro quebrado',
        url: 'http://localhost.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
