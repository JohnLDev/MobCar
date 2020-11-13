import { EntityRepository, Repository } from 'typeorm'

import Car from '../models/Car'

@EntityRepository(Car)
class UserRepository extends Repository<Car> {
  public async findByModel(model: string): Promise<Car | undefined> {
    const findCar = await this.findOne({
      where: { model: model },
    })

    return findCar
  }
}

export default UserRepository
