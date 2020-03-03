import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserExceptions } from './user.exceptions';
import { UserDTO } from './user.dto';
import { hashSync, genSaltSync } from 'bcrypt';
import { Stock } from '../stock/stock.entity';

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

  async createUser(userDTO: UserDTO): Promise<void> {
    const user = new User();

    user.username = userDTO.username;
    user.name = userDTO.name;
    user.password = hashSync(userDTO.password, genSaltSync());

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException({ message: UserExceptions.CREATE_USER });
    }
  }

  async getUserStocks(id: number): Promise<Stock[]> {
    return (await this.getById(id, ['stocks'])).stocks;
  }
}
