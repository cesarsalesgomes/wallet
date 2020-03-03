import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique, Check } from 'typeorm';
import { StockType } from 'src/modules/stock/stock.enum';
import { User } from 'src/modules/user/user.entity';

@Entity({
  name: 'TB_STC',
})
@Unique(['user', 'symbol', 'type'])
@Check(`"value" >= 0`)
@Check(`"quantity" > 0`)
@Check(`"type" = 1 OR "type" = 2 OR "type" = 3`)
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
    user => user.stocks,
  )
  user: User;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column({
    type: 'float',
  })
  value: number;

  @Column()
  quantity: number;

  @Column()
  type: StockType;
}
