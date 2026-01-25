import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { from, map } from 'rxjs';
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {

  @SubscribeMessage('chat')
  handleEvent(@MessageBody() data: string) {
    const event = 'chat';
    const response = [1, 2, 3];

    return from(response).pipe(
      map(data => ({ event, data })),
    );
  }
  
}
