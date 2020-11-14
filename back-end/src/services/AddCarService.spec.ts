import { v4 } from 'uuid'
import AppError from '../errors/AppError'
import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import AddCarService from './AddCarService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'
import { hash } from 'bcryptjs'

describe('AddCarService', () => {
  it('should be able to create a car', async () => {
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
      password: await hash('admin', 8),
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
    expect(car).toHaveProperty('id')
  })
  it('should be not able to add a car with invalid category', async () => {
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
      password: await hash('admin', 8),
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
      is_Adm: true,
    })

    await expect(
      addCarService.execute({
        model: 'camaro',
        board: 'ick9090',
        category: 'vipp' as 'vip' | 'padrao' | 'executivo',
        color: 'black',
        user_Id: user.id,
        observations: 'vidro quebrado',
        url: 'http://localhost.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to add a car without an admin user', async () => {
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
      password: await hash('admin', 8),
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
      is_Adm: false,
    })

    await expect(
      addCarService.execute({
        model: 'camaro',
        board: 'ick9090',
        category: 'vip',
        color: 'black',
        user_Id: user.id,
        observations: 'vidro quebrado',
        url: 'http://localhost.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to add a car without an user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )

    await expect(
      addCarService.execute({
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

  it('should be not able to add a car with already regustered board', async () => {
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
      password: await hash('admin', 8),
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
      is_Adm: true,
    })
    await addCarService.execute({
      model: 'camaro',
      board: 'ick9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    await expect(
      addCarService.execute({
        model: 'camaro',
        board: 'ick9090',
        category: 'vip',
        color: 'black',
        user_Id: user.id,
        observations: 'vidro quebrado',
        url: 'http://localhost.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to put all same model cars in same category', async () => {
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
      password: await hash('admin', 8),
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
      is_Adm: true,
    })
    await addCarService.execute({
      model: 'camaro',
      board: 'ick9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    const car = await addCarService.execute({
      model: 'camaro',
      board: 'ilk9090',
      category: 'padrao',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    expect(car.category).toBe('vip')
  })
})
