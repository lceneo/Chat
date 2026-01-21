import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/requests/sign-in.dto';
import type { Response } from 'express';
import { SkipAuthentication } from './decorators/skip-authentication.decorator';

@Controller('auth')
@SkipAuthentication()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp() {
    return await this.authService.signUp();
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDTO: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(signInDTO);
    res.cookie('Access-Token', token, { httpOnly: true, sameSite: 'strict' });
  }
}
