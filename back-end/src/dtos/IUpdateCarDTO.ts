export default interface IUpdateCarDTO {
  id: string
  model?: string
  board?: string
  color?: string
  observations?: string
  category?: 'padrao' | 'executivo' | 'vip'
  url?: string
  user_Id: string
}
