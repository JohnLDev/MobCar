import { hash } from 'bcryptjs'
import AppError from '../errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository()
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

    expect(user).toHaveProperty('id')
  })
  it('should be not able to create a user with an already registered email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    await createUserService.execute({
      name: 'admin',
      cpf: '000.138.060-50',
      email: 'admin@admin.com',
      password: 'admin',
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
    })
    await expect(
      createUserService.execute({
        name: 'admin',
        cpf: '000.138.060-50',
        email: 'admin@admin.com',
        password: 'admin',
        cellphone: 53984523422,
        birthdate: new Date(2020, 11, 11),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
