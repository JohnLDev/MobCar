import Car from '../models/Car'
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
  id: number
  model: string
  board: string
  color: string
  observations: string
  url: string
  rents: IRentResponse[]
  category: 'padrao' | 'executivo' | 'vip'
  created_at: string
  updated_at: string
}
export default {
  render(car: Car): IResponse {
    return {
      id: car.id,
      model: car.model,
      board: car.board,
      color: car.color,
      observations: car.observations,
      url: car.url,
      category: car.category,
      rents: car.rents ? RentView.renderMany(car.rents) : [],
      created_at: car.created_at
        ? FormatDate(car.created_at)
        : FormatDate(new Date(Date.now())),
      updated_at: car.updated_at
        ? FormatDate(car.updated_at)
        : FormatDate(new Date(Date.now())),
    }
  },
  renderMany(cars: Car[]): IResponse[] {
    return cars.map(car => this.render(car))
  },
}
