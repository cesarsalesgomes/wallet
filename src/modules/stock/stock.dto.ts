import { StockType } from './stock.enum';

export class StockDTO {
  symbol: string;
  name: string;
  quantity: number;
  type: StockType;
}
