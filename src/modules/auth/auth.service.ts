import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { AuthExceptions } from './auth.exceptions';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getByFilter(username);

    if (!(user && user.password === password)) throw new UnauthorizedException({ message: AuthExceptions.INVALID_CREDENTIALS });

    return user;
  }

  async login(user: User) {
    const payload = { ...user };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
