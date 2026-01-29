import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { CoreModule } from './core/core.module';
import { ChatModule } from './features/chat/chat.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ChatModule,
  ],
})
export class AppModule {}
