import Rent from '../models/Rent'
import FormatDate from '../utils/FormatDate'

interface IResponse {
  id: number
  date_From: string
  date_Until: string
  price: number
  user_Id: string
  car_Id: string
  created_at: string
  updated_at: string
}
export default {
  render(rent: Rent): IResponse {
    return {
      id: rent.id,
      date_From: FormatDate(rent.date_From),
      date_Until: FormatDate(rent.date_Until),
      price: rent.price,
      user_Id: rent.user_Id,
      car_Id: rent.car_Id,
      created_at: rent.created_at
        ? FormatDate(rent.created_at)
        : FormatDate(new Date(Date.now())),
      updated_at: rent.updated_at
        ? FormatDate(rent.updated_at)
        : FormatDate(new Date(Date.now())),
    }
  },
  renderMany(rents: Rent[]): IResponse[] {
    return rents.map(rent => this.render(rent))
  },
}
