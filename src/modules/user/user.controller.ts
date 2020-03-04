import { Controller, Get, UseGuards, Body, Post, Patch, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Stock } from '../stock/stock.entity';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UserDTO } from 'src/modules/user/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/stocks')
  public async getUserStocks(@Request() req): Promise<Stock[]> {
    return await this.userService.getUserStocks(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/stocks')
  public async updateUserStocks(@Request() req): Promise<Stock[]> {
    return await this.userService.updateUserStocks(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async createUser(@Body() user: UserDTO): Promise<void> {
    return await this.userService.createUser(user);
  }
}
