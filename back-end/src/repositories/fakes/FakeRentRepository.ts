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
    Object.assign(rent, { car_Id, date_From, date_Until, user_Id, price })

    this.rents.push(rent)
    return rent
  }
}
