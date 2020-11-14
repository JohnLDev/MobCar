import { Request, Response } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'
import CreateUserService from '../services/CreateUserService'
import { container } from 'tsyringe'
import UserView from '../views/UserView'

export default {
  async Login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authenticateUserService = container.resolve(AuthenticateUserService)
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    })
    return response.status(200).json({
      user: UserView.render(user),
      token,
    })
  },

  async SignUp(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, cellphone, birthdate } = request.body

    const createUserService = container.resolve(CreateUserService)
    const user = await createUserService.execute({
      name,
      cpf,
      email,
      password,
      cellphone,
      birthdate,
    })
    return response.status(201).json(UserView.render(user))
  },
}
