import AppError from '../errors/AppError'
import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AddCarService from './AddCarService'
import CreateUserService from './CreateUserService'
import DeleteCarService from './DeleteCarService'
import { v4 } from 'uuid'

describe('DeleteCarService', () => {
  it('should be able to delete a car', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const deleteCarService = new DeleteCarService(
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
    const deleted = await deleteCarService.execute({
      id: String(car.id),
      user_Id: user.id,
    })
    expect(deleted).toBeFalsy()
  })

  it('should be not able to delete a car without an admin user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const deleteCarService = new DeleteCarService(
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
    await expect(
      deleteCarService.execute({
        id: String(car.id),
        user_Id: v4(),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to delete without a valid car', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()

    const deleteCarService = new DeleteCarService(
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

    await expect(
      deleteCarService.execute({
        id: '2',
        user_Id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
