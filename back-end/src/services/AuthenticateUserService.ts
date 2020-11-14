import User from '../models/User'
import 'reflect-metadata'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import { inject, injectable } from 'tsyringe'
import IUserRepository from '../repositories/IUserRepository'
import * as yup from 'yup'

interface IRequest {
  email: string
  password: string
}
interface IResponse {
  user: User
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email || !password) {
      throw new AppError('Por favor informe email e senha')
    }
    const schema = yup.string().email().required()

    await schema.validate(email)

    email = email.toLocaleLowerCase()
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('combinação incorreta de email/senha', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('combinação incorreta de email/senha', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret as string, {
      subject: String(user.id),
      expiresIn: expiresIn,
    })

    return { user, token }
  }
}
