import FakeCarRepository from '../repositories/fakes/FakeCarRepository'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeRentRepository from '../repositories/fakes/FakeRentRepository'
import AddCarService from './AddCarService'
import CreateUserService from './CreateUserService'
import RentCarService from './RentCarService'
import AppError from '../errors/AppError'

describe('RentCarService', () => {
  it('should be able to rent a car', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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
    const rent = await rentCarService.execute({
      date_From: '01/11/3020',
      date_Until: '02/11/3020',
      user_Id: user.id,
      id: String(car.id),
    })
    expect(rent).toHaveProperty('price')
  })

  it('should be not able to rent a car in invalid date', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '12/12/1020',
        date_Until: '12/12/1020',
        user_Id: user.id,
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to rent a car in invalid date', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '11/12/1020',
        date_Until: '10/12/1020',
        user_Id: user.id,
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to rent a car in a date already rented', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '01/12/3020',
        date_Until: '15/12/3020',
        user_Id: user.id,
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to rent a car in a date already rented', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '01/11/3020',
        date_Until: '14/12/3020',
        user_Id: user.id,
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to rent a car in a date already rented', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '04/12/3020',
        date_Until: '19/12/3020',
        user_Id: user.id,
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to rent a car in a date already rented', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '04/11/3020',
        date_Until: '19/12/3020',
        user_Id: user.id,
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to rent a car in a date already rented', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '04/12/3020',
        date_Until: '12/12/3020',
        user_Id: user.id,
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be not able to rent a car without be logged in user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()
    const addCarService = new AddCarService(
      fakeCarRepository,
      fakeUserRepository,
    )
    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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

    await expect(
      rentCarService.execute({
        date_From: '04/12/3020',
        date_Until: '12/12/3020',
        user_Id: 'user.id',
        id: String(car.id),
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should be not able to rent a car that does not exist', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeCarRepository = new FakeCarRepository()
    const fakeRentRepository = new FakeRentRepository()

    const rentCarService = new RentCarService(
      fakeCarRepository,
      fakeRentRepository,
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
      rentCarService.execute({
        date_From: '04/12/3020',
        date_Until: '12/12/3020',
        user_Id: user.id,
        id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
