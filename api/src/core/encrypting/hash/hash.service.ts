import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'node:crypto';
import { compare, hash as bcryptHash } from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {
    this.hash256Secret =
      this.configService.get('HASH_SHA256_SECRET') ?? 'HASH_SHA256_SECRET';
  }

  private readonly hash256Secret: string;
  async hash(textToHash: string, deterministic = false) {
    if (!deterministic) {
      return bcryptHash(textToHash, 10);
    }
    return createHash('sha256')
      .update(textToHash)
      .update(this.hash256Secret)
      .digest('hex');
  }

  async compare(
    textToCompare: string,
    encryptedText: string,
    deterministic = false,
  ) {
    if (!deterministic) {
      return compare(textToCompare, encryptedText);
    }
    const hashed256 = await this.hash(textToCompare, true);
    return hashed256 === encryptedText;
  }
}
