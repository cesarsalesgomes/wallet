import { Module } from '@nestjs/common';
import { AlphaVantageService } from './alpha-vantage.service';
import { AlphaVantageController } from './alpha-vantage.controller';

@Module({
  controllers: [AlphaVantageController],
  providers: [AlphaVantageService],
  exports: [AlphaVantageService],
})
export class AlphaVantageModule {}
