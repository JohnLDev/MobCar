import ICreateCarDTO from '../../dtos/ICreateCarDTO'
import Car from '../../models/Car'
import ICarRepository from '../ICarRepository'

export default class FakeCarRepository implements ICarRepository {
  private cars: Car[] = []

  public async create({
    model,
    board,
    category,
    color,
    observations,
    url,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, {
      id: this.cars.length + 1,
      model,
      board,
      category,
      color,
      observations,
      url,
      rents: [
        {
          id: 22,
          date_From: new Date(3020, 11, 1),
          date_Until: new Date(3020, 11, 15),
          created_at: new Date(3020, 12, 12),
          updated_at: new Date(3020, 12, 12),
        },
      ],
      created_at: new Date(2020, 11, 11),
      updated_at: new Date(2020, 11, 11),
    })

    this.cars.push(car)

    return car
  }

  public async update(car: Car): Promise<Car> {
    this.cars = this.cars.filter(carro => carro.id !== car.id)
    this.cars.push(car)
    return car
  }

  public async delete(id: number): Promise<void> {
    this.cars.filter(car => car.id !== id)
  }

  public async findByModel(model: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.model === model)

    return findCar
  }

  public async findByBoard(board: string): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.board === board)

    return findCar
  }

  public async findById(id: number): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.id === id)

    return findCar
  }

  public async findOne(id: number): Promise<Car | undefined> {
    const findCar = this.cars.find(car => car.id === id)

    return findCar
  }

  public async findAll(): Promise<Car[]> {
    return this.cars
  }
}
