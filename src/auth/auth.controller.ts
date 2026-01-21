import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp() {
    await this.authService.signUp();
  }

  @Get()
  async getUsers() {
    return await this.authService.getUsers();
  }
}
