import { Controller, Get, Param } from '@nestjs/common';
import { AlphaVantageService } from './alpha-vantage.service';

@Controller('stocks')
export class AlphaVantageController {
  constructor(private readonly alphaVantageService: AlphaVantageService) {}

  @Get('/:symbol')
  public async getStock(@Param('symbol') symbol: string): Promise<any> {
    return await this.alphaVantageService.getStockValue(symbol);
  }
}
