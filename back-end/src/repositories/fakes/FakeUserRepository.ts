import ICreateUserDTO from '../../dtos/ICreateUserDTO'
import User from '../../models/User'
import IUserRepository from '../IUserRepository'
import { v4 } from 'uuid'
export default class FakeUserRepository implements IUserRepository {
  private users: User[] = []

  public async create({
    name,
    email,
    password,
    cpf,
    birthdate,
    cellphone,
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: v4(),
      name,
      email,
      password,
      cpf,
      birthdate,
      cellphone,
      created_at: new Date(2020, 11, 11),
      updated_at: new Date(2020, 11, 11),
    })
    this.users.push(user)
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)

    return findUser
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }
}
