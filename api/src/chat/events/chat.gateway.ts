import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
 
  @SubscribeMessage('chat')
  handleEvent(@MessageBody() data: string) {
    return data;
  }
  
}
