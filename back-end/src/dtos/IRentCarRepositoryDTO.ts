export default interface IRentCarRepositoryDTO {
  id: string
  date_From: Date
  date_Until: Date
  user_Id?: string
  price: number
}
