import AppError from '../errors/AppError'
import AuthenticateUserService from './AuthenticateUserService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import CreateUserService from './CreateUserService'

import { ValidationError } from 'yup'
import { hash } from 'bcryptjs'

describe('AuthenticateUserService', () => {
  it('should be able to authenticate a valid user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'admin',
      cpf: '000.138.060-50',
      email: 'admin@admin.com',
      password: '123',
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
      is_Adm: false,
    })

    const authenticatedUser = await authUserService.execute({
      email: user.email,
      password: '123',
    })
    expect(authenticatedUser).toHaveProperty('token')
  })

  it('should be not able to authenticate an invalid email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    await expect(
      authUserService.execute({ email: 'johnlenon.com', password: '1234567' }),
    ).rejects.toBeInstanceOf(ValidationError)
  })

  it('should be not able to authenticate an invalid user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    expect(
      authUserService.execute({
        email: 'email@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to authenticate a user with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    const user = await createUserService.execute({
      name: 'admin',
      cpf: '000.138.060-50',
      email: 'admin@admin.com',
      password: await hash('admin', 8),
      cellphone: 53984523422,
      birthdate: new Date(2020, 11, 11),
    })

    await expect(
      authUserService.execute({
        email: user.email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to authenticate a user without password or email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const authUserService = new AuthenticateUserService(fakeUserRepository)

    await expect(
      authUserService.execute({
        email: '',
        password: '',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
