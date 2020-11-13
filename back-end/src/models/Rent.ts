import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Car from './Car'
import User from './User'

@Entity('rents')
export default class Rent {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  date_From: Date

  @Column()
  date_Until: Date

  @Column()
  price: string

  @Column()
  user_Id: string

  @Column()
  car_Id: string

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_Id' })
  user: User

  @ManyToOne(() => Car, car => car.rents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'car_Id' })
  car: Car

  @Column()
  created_at: Date

  @Column()
  updated_at: Date
}
