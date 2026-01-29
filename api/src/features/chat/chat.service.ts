import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/db/prisma.service';

@Injectable()
export class ChatService {

  constructor(private readonly prismaService: PrismaService) {}


  async getMessages() {
    return await this.prismaService.chat.findMany();
  }
}
