import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserExceptions } from './user.exceptions';
import { UserDTO } from './user.dto';
import { hashSync, genSaltSync } from 'bcrypt';
import { Stock } from '../stock/stock.entity';
import { AlphaVantageService } from '../alpha-vantage/alpha-vantage.service';
import { StockService } from '../stock/stock.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly alphaVantageService: AlphaVantageService,
    private readonly stockService: StockService,
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

  async getUserStocks(user: User): Promise<Stock[]> {
    return (await this.getById(user.id, ['stocks'])).stocks;
  }

  async updateUserStocks(user: User): Promise<Stock[]> {
    user = await this.getById(user.id, ['stocks']);

    const { stocks } = user;

    for (const stock of stocks) {
      stock.value = await this.alphaVantageService.getStockValue(stock.symbol);
    }

    await this.stockService.updateStocks(stocks);

    return user.stocks;
  }
}
