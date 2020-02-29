import { Module } from '@nestjs/common';
import { AlphaVantageService } from './alpha-vantage.service';
import { AlphaVantageController } from './alpha-vantage.controller';

@Module({
  imports: [],
  controllers: [AlphaVantageController],
  providers: [AlphaVantageService],
})
export class AlphaVantageModule {}
