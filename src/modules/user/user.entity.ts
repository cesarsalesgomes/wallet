import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stock } from '../stock/stock.entity';

@Entity({
  name: 'TB_USR',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(
    () => Stock,
    stock => stock.user,
  )
  stocks: Stock[];
}
