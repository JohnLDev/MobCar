import AppError from '../errors/AppError'
import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AddCarService from './AddCarService'
import CreateUserService from './CreateUserService'
import UpdateCarService from './UpdateCarService'

describe('UpdateCarService', () => {
  it('should be able to update a car', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const updateCarService = new UpdateCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
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
    await addCarService.execute({
      model: 'voyage',
      board: 'icl9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    const updatedCar = await updateCarService.execute({
      id: String(car.id),
      user_Id: user.id,
      board: 'içk9090',
      color: 'red',
      model: 'voyage',
      observations: 'capo amaçado',
      url: 'http://localhost.com',
    })
    expect(updatedCar.model).toBe('voyage')
  })

  it('should be not able to update a car to an existent board', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const updateCarService = new UpdateCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
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
    await addCarService.execute({
      model: 'voyage',
      board: 'icl9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    await expect(
      updateCarService.execute({
        id: String(car.id),
        user_Id: user.id,
        board: 'icl9090',
        color: 'red',
        model: 'voyage',
        observations: 'capo amaçado',
        url: 'http://localhost.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to update a car that does not exist', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const updateCarService = new UpdateCarService(
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
      birthdate: new Date(2020, 11, 11),
      is_Adm: true,
    })

    await expect(
      updateCarService.execute({
        id: '50',
        user_Id: user.id,
        board: 'icl9090',
        color: 'red',
        model: 'voyage',
        observations: 'capo amaçado',
        url: 'http://localhost.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to update a car without an admin user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const updateCarService = new UpdateCarService(
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
      birthdate: new Date(2020, 11, 11),
      is_Adm: false,
    })

    await expect(
      updateCarService.execute({
        id: '50',
        user_Id: user.id,
        board: 'icl9090',
        color: 'red',
        model: 'voyage',
        observations: 'capo amaçado',
        url: 'http://localhost.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
