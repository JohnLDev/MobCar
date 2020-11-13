import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Rent from './Rent'

@Entity('cars')
export default class Car {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  model: string

  @Column()
  board: string

  @Column()
  color: string

  @Column()
  observations: string

  @Column()
  url: string

  @Column()
  category: 'padrao' | 'executivo' | 'vip'

  @OneToMany(() => Rent, rent => rent.car)
  rents: Rent[]

  @Column()
  created_at: Date

  @Column()
  updated_at: Date
}
