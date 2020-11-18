import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AddCarService from './AddCarService'
import CreateUserService from './CreateUserService'
import CalculateRentPriceService from './CalculateRentPriceService'
import { v4 } from 'uuid'
import AppError from '../errors/AppError'

describe('CalculateRentPriceService', () => {
  it('should be able to calculate any rent price', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )

    const createUserService = new CreateUserService(fakeUserRepository)
    const user = await createUserService.execute({
      name: 'admin',
      cpf: '000.138.060-50',
      email: 'admin@admin.com',
      password: 'admin',
      cellphone: 53984523422,
      birthdate: '11/12/2020',
      is_Adm: true,
    })

    const car = await addCarService.execute({
      model: 'camaro',
      board: 'ick9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    const calculateRentPriceService = new CalculateRentPriceService(
      fakeCarRepository,
    )
    const price = await calculateRentPriceService.execute({
      user_Id: user.id,
      id: String(car.id),
      date_From: '12/12/2020',
      date_Until: '12/12/2020',
    })
    expect(price).toHaveProperty('price')
  })

  it('should be not able to calculate price of an invalida car', async () => {
    const fakeCarRepository = new FakeCarRepository()

    const calculateRentPriceService = new CalculateRentPriceService(
      fakeCarRepository,
    )
    await expect(
      calculateRentPriceService.execute({
        user_Id: v4(),
        id: '1',
        date_From: '12/12/2020',
        date_Until: '12/12/2020',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
