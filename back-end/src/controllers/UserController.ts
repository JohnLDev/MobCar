import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'

export default {
  // async login(request: Request, response: Response): Promise<Response> {
  //   const { email, password } = request.body
  //   const authenticateUserService = new AuthenticateUserService()
  //   const { user, token } = await authenticateUserService.execute({
  //     email,
  //     password,
  //   })
  //   return response.status(200).json({
  //     user: UserView.render(user),
  //     token,
  //   })
  // },

  // async signup(request: Request, response: Response): Promise<Response> {
  //   const { name, email, password } = request.body
  //   const createUserService = new CreateUserService()
  //   const user = await createUserService.execute({
  //     name,
  //     email,
  //     password,
  //   })
  //   return response.status(201).json(UserView.render(user))
  // },

  async Create(request: Request, response: Response): Promise<Response> {
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
