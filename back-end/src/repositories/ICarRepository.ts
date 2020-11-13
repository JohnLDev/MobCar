import ICreateCarDTO from '../dtos/ICreateCarDTO'
import IIndexCarDTO from '../dtos/IIndexCarDTO'
import Car from '../models/Car'

export default interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>
  update(car: Car): Promise<Car>
  findById(id: number): Promise<Car | undefined>
  findOne(id: number): Promise<Car | undefined>
  findAll(data?: IIndexCarDTO): Promise<Car[]>
  findByBoard(board: string): Promise<Car | undefined>
  findByModel(model: string): Promise<Car | undefined>
  delete(id: number): Promise<void>
}
