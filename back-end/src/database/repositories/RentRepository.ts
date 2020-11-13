import { Repository, getRepository } from 'typeorm'
import IRentCarRepositoryDTO from '../../dtos/IRentCarRepositoryDTO'
import IRentRepository from '../../repositories/IRentRepository'
import Rent from '../../models/Rent'

class RentRepository implements IRentRepository {
  private ormRepository: Repository<Rent>

  constructor() {
    this.ormRepository = getRepository(Rent)
  }

  public async create({
    id: car_Id,
    date_From,
    date_Until,
    user_Id,
    price,
  }: IRentCarRepositoryDTO): Promise<Rent> {
    const rent = this.ormRepository.create({
      car_Id,
      date_From,
      date_Until,
      user_Id,
      price,
    })
    await this.ormRepository.save(rent)
    return rent
  }
}

export default RentRepository
