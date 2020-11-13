import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column()
  created_at: Date

  @Column()
  updated_at: Date
}
