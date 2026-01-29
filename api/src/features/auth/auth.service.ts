import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { SignInDto } from './dto/requests/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../core/db/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signUp() {
    return await this.userService.create();
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
