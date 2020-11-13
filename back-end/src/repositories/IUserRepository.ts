import ICreateUserDTO from '../dtos/ICreateUserDTO'
import User from '../models/User'

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
}
