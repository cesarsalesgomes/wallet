import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { AlphaVantageModule } from '../alpha-vantage/alpha-vantage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), AlphaVantageModule],
  providers: [StockService],
  exports: [StockService],
  controllers: [StockController],
})
export class StockModule {}
