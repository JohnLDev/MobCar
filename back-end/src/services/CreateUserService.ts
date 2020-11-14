import User from '../models/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import { hash } from 'bcryptjs'
import * as yup from 'yup'
import AppError from '../errors/AppError'
import IUserRepository from '../repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    cpf,
    email,
    password,
    cellphone,
    birthdate,
    is_Adm,
  }: ICreateUserDTO): Promise<User> {
    email = email.toLocaleLowerCase()
    if (!is_Adm) {
      is_Adm = false
    }
    const data = {
      name,
      cpf,
      email,
      password,
      cellphone,
      birthdate,
      is_Adm,
    }
    const schema = yup.object().shape({
      name: yup.string().required('Insira seu nome'),
      cpf: yup.string().required('Insira seu cpf'),
      email: yup.string().email('insira um email').required('insira um email'),
      password: yup.string().required('Insira sua senha'),
      cellphone: yup.number().required('Insira seu numero de contato'),
      birthdate: yup.string().required('Insira sua data de nascimento'),
      is_Adm: yup.boolean(),
    })
    await schema.validate(data)

    const emailAlreadyRegistered = await this.userRepository.findByEmail(
      data.email,
    )

    if (emailAlreadyRegistered) {
      throw new AppError('Email já registrado')
    }
    data.password = await hash(password, 8)
    const user = await this.userRepository.create(data)

    return user
  }
}
