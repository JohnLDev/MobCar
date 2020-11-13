import { Request, Response } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'
import CreateUserService from '../services/CreateUserService'

export default {
  async Login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authenticateUserService = new AuthenticateUserService()
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    })
    return response.status(200).json({
      user: user,
      token,
    })
  },

  async SignUp(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, cellphone, birthdate } = request.body

    const createUserService = new CreateUserService()
    const user = await createUserService.execute({
      name,
      cpf,
      email,
      password,
      cellphone,
      birthdate,
    })
    return response.status(201).json(user)
  },
}
