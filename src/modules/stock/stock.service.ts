import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockDTO } from './stock.dto';
import { Stock } from '../stock/stock.entity';
import { AlphaVantageService } from '../alpha-vantage/alpha-vantage.service';
import { User } from '../user/user.entity';
import { StockExceptions } from './stock.exceptions';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stocksRepository: Repository<Stock>,
    private readonly alphaVantageService: AlphaVantageService,
  ) {}

  async createStock(user: User, stockDTO: StockDTO): Promise<void> {
    const stock = new Stock();

    stock.value = await this.alphaVantageService.getStockValue(stockDTO.symbol);

    stock.user = user;
    stock.symbol = stockDTO.symbol;
    stock.name = stockDTO.name;
    stock.quantity = stockDTO.quantity;
    stock.type = stockDTO.type;

    try {
      await this.stocksRepository.save(stock);
    } catch (error) {
      throw new InternalServerErrorException({ message: StockExceptions.SAVE_ERROR });
    }
  }
}
