import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* Entities */
import { User } from './user.entity';
import { Stock } from '../stock/stock.entity';

/* Exceptions */
import { UserExceptions } from './user.exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getById(id: number, relations?: string[]): Promise<User> {
    const user = await this.usersRepository.findOne(id, { relations });

    if (!user) throw new InternalServerErrorException({ message: UserExceptions.USER_NOT_FOUND });

    return user;
  }

  async getByFilter(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) throw new InternalServerErrorException({ message: UserExceptions.USER_NOT_FOUND });

    return user;
  }

  async getUserStocks(id: number): Promise<Stock[]> {
    return (await this.getById(id, ['stocks'])).stocks;
  }
}
