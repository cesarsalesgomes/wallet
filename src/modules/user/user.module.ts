import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AlphaVantageModule } from '../alpha-vantage/alpha-vantage.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AlphaVantageModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
