import User from '../models/User'
import FormatDate from '../utils/FormatDate'
import RentView from '../views/RentView'

interface IRentResponse {
  id: number
  date_From: string
  date_Until: string
  price: number
  user_Id: string
  car_Id: string
  created_at: string
  updated_at: string
}

interface IResponse {
  id: string
  name: string
  email: string
  cpf: string
  cellphone: number
  is_Adm: boolean | undefined
  birthdate: string
  rents: IRentResponse[] | []
  created_at: string
  updated_at: string
}

export default {
  render(user: User): IResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      cellphone: user.cellphone,
      birthdate: FormatDate(user.birthdate),
      is_Adm: user.is_Adm,
      rents: user.rents
        ? user.rents.length > 0
          ? RentView.renderMany(user.rents)
          : []
        : [],
      created_at: user.created_at
        ? FormatDate(user.created_at)
        : FormatDate(new Date(Date.now())),
      updated_at: user.updated_at
        ? FormatDate(user.updated_at)
        : FormatDate(new Date(Date.now())),
    }
  },
  renderMany(users: User[]): IResponse[] {
    return users.map(user => this.render(user))
  },
}
