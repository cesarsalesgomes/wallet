import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlphaVantageModule } from 'src/modules/alpha-vantage/alpha-vantage.module';
import { UserModule } from 'src/modules/user/user.module';
import { StockModule } from 'src/modules/stock/stock.module';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    AlphaVantageModule,
    UserModule,
    StockModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
