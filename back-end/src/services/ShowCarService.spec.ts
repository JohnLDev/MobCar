import AppError from '../errors/AppError'
import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AddCarService from './AddCarService'
import CreateUserService from './CreateUserService'
import ShowCarService from './ShowCarService'

describe('ShowCarService', () => {
  it('Should be able to show car', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const showCarService = new ShowCarService(fakeCarRepository)

    const createUserService = new CreateUserService(fakeUserRepository)
    const user = await createUserService.execute({
      name: 'admin',
      cpf: '000.138.060-50',
      email: 'admin@admin.com',
      password: 'admin',
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
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
    const carShowed = await showCarService.execute({ id: String(car.id) })
    expect(carShowed).toHaveProperty('id')
  })
  it('Should be not able to show car that does not exist', async () => {
    const fakeCarRepository = new FakeCarRepository()

    const showCarService = new ShowCarService(fakeCarRepository)

    await expect(showCarService.execute({ id: '1' })).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
