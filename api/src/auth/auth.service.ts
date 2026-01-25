import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../core/db/prisma.service';
import { SignInDto } from './dto/requests/sign-in.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async signUp() {
    return await this.userService.create();
  }

  async signIn(signInDTO: SignInDto) {
    const user = await this.userService.findOne(signInDTO.userId);
    if (!user) {
      throw new NotFoundException('No such user');
    }
    const payload = { sub: user.id };
    return await this.jwtService.signAsync(payload);
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }
}
