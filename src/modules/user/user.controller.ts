import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/:id')
  public async getUser( @Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return await this.userService.getUser(id);
  }
}
