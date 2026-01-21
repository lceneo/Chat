import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
