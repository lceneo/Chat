import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/db/prisma.service';

@Injectable()
export class AuthService {

  constructor(private readonly prismaService: PrismaService) {}

  async signUp() {
    return this.prismaService.user.create({
      data: {},
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }
}
