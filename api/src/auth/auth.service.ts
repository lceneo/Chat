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
    const user = await this.userService.create();
    await this.signIn({ loginId: user.id });
    return user;
  }

  async signIn(signInDTO: SignInDto) {
    const { loginId } = signInDTO;
    const user = await this.userService.findOneByLoginId(loginId);
    if (!user) {
      throw new NotFoundException('No such user');
    }
    const payload = { sub: loginId };
    return await this.jwtService.signAsync(payload);
  }

  async signOut() {

  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }
}
