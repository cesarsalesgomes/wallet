import { Injectable, InternalServerErrorException } from '@nestjs/common';
import AlphaVantage from 'alphavantage-ts';
import { AlphaVantageConstants } from './alpha-vantage.constants';
import { AlphaVantageExceptions } from './alpha-vantage.exceptions';

@Injectable()
export class AlphaVantageService {
  private alphaVantage: AlphaVantage;

  constructor() {
    this.alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY);
  }

  public async getStockValue(symbol: string): Promise<number> {
    const res = await this.alphaVantage.stocks.quote(symbol, {});

    if (!(res && res[AlphaVantageConstants.key] && res[AlphaVantageConstants.key][AlphaVantageConstants.price]))
      throw new InternalServerErrorException({ message: AlphaVantageExceptions.INVALID_FORMAT });

    const price = Number(res[AlphaVantageConstants.key][AlphaVantageConstants.price]);

    if (isNaN(price)) throw new InternalServerErrorException({ message: AlphaVantageExceptions.INVALID_PRICE });

    return price;
  }
}
