import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlphaVantageModule } from './modules/alpha-vantage/alpha-vantage.module';

@Module({
  imports: [AlphaVantageModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule { }
