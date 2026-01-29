import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatEventsModule } from './events/chat-events.module';

@Module({
  controllers: [ChatController],
  imports: [ChatEventsModule],
  providers: [ChatService],
})
export class ChatModule {}
