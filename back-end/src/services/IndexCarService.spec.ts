import AppError from '../errors/AppError'
import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AddCarService from './AddCarService'
import CreateUserService from './CreateUserService'
import IndexCarService from './IndexCarService'

describe('IndexCarService', () => {
  it('should be able to list cars with all filters', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const indexCarService = new IndexCarService(fakeCarRepository)

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

    await addCarService.execute({
      model: 'camaro',
      board: 'ick9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    await addCarService.execute({
      model: 'camaro',
      board: 'ics9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    const cars = await indexCarService.execute({
      category: 'vip',
      max: 1,
      model: 'Camaro',
      pag: 'asc',
    })
    expect(cars.length).toBeGreaterThanOrEqual(1)
  })

  it('should be able to list cars with all filters', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const indexCarService = new IndexCarService(fakeCarRepository)

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

    await addCarService.execute({
      model: 'camaro',
      board: 'ick9090',
      category: 'vip',
      color: 'black',
      user_Id: user.id,
      observations: 'vidro quebrado',
      url: 'http://localhost.com',
    })
    const cars = await indexCarService.execute({
      category: 'vip',
      max: 1,
      model: 'Camaro',
      pag: 'desc',
    })
    expect(cars.length).toBeGreaterThanOrEqual(1)
  })

  it('should be not able to list cars with an invalid category', async () => {
    const fakeCarRepository = new FakeCarRepository()

    const indexCarService = new IndexCarService(fakeCarRepository)

    await expect(
      indexCarService.execute({
        category: 'vipp',
        max: 1,
        model: 'Camaro',
        pag: 'asc',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to list cars with an invalid ordenation page', async () => {
    const fakeCarRepository = new FakeCarRepository()

    const indexCarService = new IndexCarService(fakeCarRepository)

    await expect(
      indexCarService.execute({
        category: 'vip',
        max: 1,
        model: 'Camaro',
        pag: 'asssc' as 'asc' | 'desc',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
