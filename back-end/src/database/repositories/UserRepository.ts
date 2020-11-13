import { Repository, getRepository } from 'typeorm'

import User from '../../models/User'
import ICreateUserDTO from '../../dtos/ICreateUserDTO'
import IUserRepository from '../../repositories/IUserRepository'

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({
    name,
    email,
    password,
    cpf,
    birthdate,
    cellphone,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      cpf,
      birthdate,
      cellphone,
    })
    await this.ormRepository.save(user)
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email: email },
    })

    return findUser
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id: id },
    })

    return findUser
  }
}

export default UserRepository
