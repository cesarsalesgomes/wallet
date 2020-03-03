import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StockDTO } from './stock.dto';
import { StockService } from './stock.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Stock } from './stock.entity';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async createStock(@Request() req, @Body() stock: StockDTO): Promise<Stock> {
    return await this.stockService.createStock(req.user, stock);
  }
}
