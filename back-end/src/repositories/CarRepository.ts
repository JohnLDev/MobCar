import { EntityRepository, Repository } from 'typeorm'

import Car from '../models/Car'

@EntityRepository(Car)
class CarRepository extends Repository<Car> {
  public async findByModel(model: string): Promise<Car | undefined> {
    const findCar = await this.findOne({
      where: { model: model },
    })

    return findCar
  }

  public async findByBoard(board: string): Promise<Car | undefined> {
    const findCar = await this.findOne({
      where: { board: board },
    })

    return findCar
  }

  public async findById(id: number): Promise<Car | undefined> {
    const findCar = await this.findOne({
      where: { id: id },
      relations: ['rents'],
    })

    return findCar
  }
}

export default CarRepository
