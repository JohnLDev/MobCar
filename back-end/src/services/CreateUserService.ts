import User from '../models/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import * as yup from 'yup'
import AppError from '../errors/AppError'

export default class CreateUserService {
  public async execute({
    name,
    cpf,
    email,
    password,
    cellphone,
    birthdate,
  }: ICreateUserDTO): Promise<User> {
    email = email.toLocaleLowerCase()
    const data = {
      name,
      cpf,
      email,
      password,
      cellphone,
      birthdate,
    }
    const schema = yup.object().shape({
      name: yup.string().required('Insira seu nome'),
      cpf: yup.string().required('Insira seu cpf'),
      email: yup.string().email('insira um email').required('insira um email'),
      password: yup.string().required('Insira sua senha'),
      cellphone: yup.number().required('Insira seu numero de contato'),
      birthdate: yup.string().required('Insira sua data de nascimento'),
    })
    await schema.validate(data)

    const userRepository = getRepository(User)

    const emailAlreadyRegistered = await userRepository.findOne({
      where: { email: data.email },
    })
    if (emailAlreadyRegistered) {
      throw new AppError('Email já registrado')
    }

    const user = userRepository.create(data)
    user.password = await hash(password, 8)
    await userRepository.save(user)
    return user
  }
}
