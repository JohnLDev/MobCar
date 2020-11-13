import User from '../models/User'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import UserRepository from '../repositories/UserRepository'

interface IRequest {
  email: string
  password: string
}
interface IResponse {
  user: User
  token: string
}

export default class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email || !password) {
      throw new AppError('Please insert email and password to login')
    }
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret as string, {
      subject: String(user.id),
      expiresIn: expiresIn,
    })

    return { user, token }
  }
}
