export default interface ICreateCarDTO {
  model: string
  board: string
  color: string
  observations?: string
  category: 'padrao' | 'executivo' | 'vip'
  url?: string
}
