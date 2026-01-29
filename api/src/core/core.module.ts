import { Global, Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { EncryptingModule } from './encrypting/encrypting.module';

@Global()
@Module({
  imports: [DbModule, EncryptingModule],
  exports: [DbModule, EncryptingModule],
})
export class CoreModule {}
