import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Stock } from '../stock/stock.entity';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './user.decorator';
import { User } from './user.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [Stock])
  @UseGuards(GqlAuthGuard)
  async getUserStocks(@CurrentUser() user: User) {
    return this.userService.getUserStocks(user);
  }
}
