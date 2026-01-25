import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/db/prisma.service';
import { MessageCreateNestedManyWithoutSenderInput } from '../generated/prisma/models/Message';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create() {
    return this.prismaService.user.create({
      data: {},
    });
  }

  async findOne(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
