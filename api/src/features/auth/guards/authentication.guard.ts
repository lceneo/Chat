import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { SKIP_AUTHENTICATION } from '../decorators/skip-authentication.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const skipAuthentication = this.reflector.getAllAndOverride<boolean>(
      SKIP_AUTHENTICATION,
      [context.getHandler(), context.getClass()],
    );
    if (skipAuthentication) {
      return true;
    }
    const token = request.cookies['Access-Token'] as string;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('No token provided');
    }
    return true;
  }
}
