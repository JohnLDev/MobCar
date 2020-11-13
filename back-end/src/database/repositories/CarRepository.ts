import { getRepository, Repository } from 'typeorm'
import ICarRepository from '../../repositories/ICarRepository'
import ICreateCarDTO from '../../dtos/ICreateCarDTO'
import Car from '../../models/Car'

class CarRepository implements ICarRepository {
  private ormRepository: Repository<Car>

  constructor() {
    this.ormRepository = getRepository(Car)
  }

  public async create({
    model,
    board,
    category,
    color,
    observations,
    url,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      model,
      board,
      category,
      color,
      observations,
      url,
    })
    await this.ormRepository.save(car)
    return car
  }

  public async update(car: Car): Promise<Car> {
    await this.ormRepository.save(car)
    return car
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async findByModel(model: string): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne({
      where: { model: model },
    })

    return findCar
  }

  public async findByBoard(board: string): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne({
      where: { board: board },
    })

    return findCar
  }

  public async findById(id: number): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne({
      where: { id: id },
      relations: ['rents'],
    })

    return findCar
  }

  public async findOne(id: number): Promise<Car | undefined> {
    const findCar = await this.ormRepository.findOne({
      where: { id: id },
    })

    return findCar
  }

  public async findAll(): Promise<Car[]> {
    const findCars = await this.ormRepository.find()

    return findCars
  }
}

export default CarRepository
