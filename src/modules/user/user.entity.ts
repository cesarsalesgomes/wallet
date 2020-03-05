import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { Stock } from '../stock/stock.entity';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity({
  name: 'TB_USR',
})
@Unique(['username'])
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Stock)
  @OneToMany(
    () => Stock,
    stock => stock.user,
  )
  stocks: Stock[];
}
