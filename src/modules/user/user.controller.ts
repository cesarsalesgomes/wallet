import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import { Stock } from '../stock/stock.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id/stocks')
  public async getUserStocks(@Param('id', new ParseIntPipe()) id: number): Promise<Stock[]> {
    return await this.userService.getUserStocks(id);
  }

  @Get('/:id')
  public async getUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return await this.userService.getById(id);
  }
}
