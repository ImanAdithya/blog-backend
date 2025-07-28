import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.username, dto.password);
    if (!user) {
      return { code: 401, message: 'Invalid credentials', data: null };
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() dto: LoginDto) {
    return this.authService.register(dto);
  }
}
