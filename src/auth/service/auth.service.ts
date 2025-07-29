import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const user = await this.userService.findByUsername(username);
      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(user: any) {
    try {
      const payload = { username: user.username, sub: user.id };
      return {
        code: 200,
        message: 'Login successful',
        data: {
          userId: user.id,
          username: user.username,
          access_token: this.jwtService.sign(payload),
        },
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw new InternalServerErrorException('Login failed');
    }
  }

  async register(dto: { username: string; password: string }) {
    try {
      const hashed = await bcrypt.hash(dto.password, 10);
      const user = await this.userService.createUser({
        username: dto.username,
        password: hashed,
      });
      return { code: 201, message: 'User registered', data: user };
    } catch (error) {
      console.error('Registration failed:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }
}
