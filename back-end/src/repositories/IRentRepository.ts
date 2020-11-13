import IRentCarRepositoryDTO from '../dtos/IRentCarRepositoryDTO'
import Rent from '../models/Rent'

export default interface IRentRepository {
  create(data: IRentCarRepositoryDTO): Promise<Rent>
}
