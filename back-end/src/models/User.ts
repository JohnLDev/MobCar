import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Rent from './Rent'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  cpf: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  cellphone: number

  @Column()
  birthdate: Date

  @Column()
  is_Adm?: boolean

  @OneToMany(() => Rent, rent => rent.user)
  rents: Rent[]

  @Column()
  created_at: Date

  @Column()
  updated_at: Date
}
