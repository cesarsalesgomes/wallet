import { Injectable } from '@nestjs/common';
import AlphaVantage from 'alphavantage-ts';

@Injectable()
export class AlphaVantageService {
  private alphaVantage: AlphaVantage;

  constructor() {
    this.alphaVantage = new AlphaVantage(process.env.ALPHA_VANTAGE_API_KEY);
  }

  public async getStockValue(symbol: string): Promise<any> {
    return await this.alphaVantage.stocks.quote(symbol, {});
  }
}
