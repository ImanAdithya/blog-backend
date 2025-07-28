import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/service/user.service';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      code: 200,
      message: 'Login successful',
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }

  async register(dto: { username: string; password: string }) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      username: dto.username,
      password: hashed,
    });
    return { code: 201, message: 'User registered', data: user };
  }
}
