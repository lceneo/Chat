import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { CryptoService } from './crypto/crypto/crypto.service';

@Module({
  providers: [HashService, CryptoService],
  exports: [HashService, CryptoService],
})
export class EncryptingModule {}
