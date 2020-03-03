import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Modules */
import { AlphaVantageModule } from 'src/modules/alpha-vantage/alpha-vantage.module';
import { UserModule } from 'src/modules/user/user.module';
import { StockModule } from 'src/modules/stock/stock.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AlphaVantageModule, UserModule, StockModule, ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
