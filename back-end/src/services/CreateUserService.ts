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
      name: yup.string().required('inform your name'),
      cpf: yup.string().required('inform your cpf'),
      email: yup
        .string()
        .email('inform a valid email')
        .required('inform an email'),
      password: yup.string().required('inform your password'),
      cellphone: yup.number().required('inform your phone number'),
      birthdate: yup.string().required('inform your birthdate'),
      is_Adm: yup.boolean(),
    })
    await schema.validate(data)
    data.email = data.email.toLocaleLowerCase()
    const emailAlreadyRegistered = await this.userRepository.findByEmail(
      data.email,
    )

    if (emailAlreadyRegistered) {
      throw new AppError('email already registered')
    }
    data.password = await hash(password, 8)

    const [d, m, y] = String(birthdate).split('/')
    if (
      d.length !== 2 ||
      m.length !== 2 ||
      y.length !== 4 ||
      parseInt(d) > 31 ||
      parseInt(d) < 1 ||
      parseInt(m) > 12 ||
      parseInt(m) < 1
    ) {
      throw new AppError('birthdate format is invalid please use (dd/mm/yyyy)')
    }

    data.birthdate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d))
    const user = await this.userRepository.create(data)

    return user
  }
}
