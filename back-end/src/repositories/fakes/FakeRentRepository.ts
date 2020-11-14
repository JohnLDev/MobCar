import IRentCarRepositoryDTO from '../../dtos/IRentCarRepositoryDTO'
import Rent from '../../models/Rent'
import IRentRepository from '../IRentRepository'

export default class FakeRentRepository implements IRentRepository {
  private rents: Rent[] = []

  public async create({
    id: car_Id,
    date_From,
    date_Until,
    user_Id,
    price,
  }: IRentCarRepositoryDTO): Promise<Rent> {
    const rent = new Rent()
    Object.assign(rent, {
      id: this.rents.length + 1,
      car_Id: Number(car_Id),
      date_From,
      date_Until,
      user_Id,
      price,
      created_at: new Date(2020, 11, 11),
      updated_at: new Date(2020, 11, 11),
    })
    this.rents.push(rent)
    return rent
  }
}
