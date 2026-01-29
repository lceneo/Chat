import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../core/db/prisma.service';
import { User } from '../../generated/prisma/browser';
import { hash } from 'bcrypt';
import { HashService } from '../../core/encrypting/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService
  ) {}

  async create() {
    const loginId = randomUUID();
    //не генерим каждый раз новую соль, т.к при входе по loginId у нас есть только loginId
    //соответственно, нам надо будет перебирать все записи для сопоставления
    const hashedLoginId = await this.hashService.hash(loginId, true);
    const user = await this.prismaService.user.create({
      data: { hashedLoginId },
    });
    return { ...user, loginId };
  }

  async findOne(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findOneByLoginId(loginId: string) {
    const hashedLoginId = await this.hashService.hash(loginId, true);
    return this.prismaService.user.findUnique({
      where: {
        hashedLoginId,
      },
    });
  }
}
