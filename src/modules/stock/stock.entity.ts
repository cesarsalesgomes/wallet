import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique, Check } from 'typeorm';
import { StockType } from 'src/modules/stock/stock.enum';
import { User } from 'src/modules/user/user.entity';
import { ObjectType, Field, Int, Float, ID } from 'type-graphql';

@ObjectType()
@Entity({
  name: 'TB_STC',
})
@Unique(['user', 'symbol', 'type'])
@Check(`"value" >= 0`)
@Check(`"quantity" > 0`)
@Check(`"type" = 1 OR "type" = 2 OR "type" = 3`)
export class Stock {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.stocks,
  )
  user: User;

  @Field()
  @Column()
  symbol: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column({
    type: 'float',
  })
  value: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Int)
  @Column()
  type: StockType;
}
