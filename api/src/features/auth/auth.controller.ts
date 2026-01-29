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
  async signUp(@Res({ passthrough: true }) res: Response) {
    const user = await this.authService.signUp();
    const token = await this.authService.signIn({ loginId: user.loginId });
    this.setAccessTokenCookie(token, res);
    return user;
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDTO: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(signInDTO);
    this.setAccessTokenCookie(token, res);
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Access-Token');
  }

  private setAccessTokenCookie(token: string, res: Response) {
    res.cookie('Access-Token', token, { httpOnly: true, sameSite: 'strict' });
  }
}
