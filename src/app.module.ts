import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Modules */
import { AlphaVantageModule } from 'src/modules/alpha-vantage/alpha-vantage.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [AlphaVantageModule, UserModule, ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
