export default interface ICreateUserDTO {
  name: string
  cpf: string
  email: string
  password: string
  cellphone: number
  birthdate: Date | string
  is_Adm?: boolean
}
