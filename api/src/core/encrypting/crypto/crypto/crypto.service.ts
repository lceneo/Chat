import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createCipheriv,
  createDecipheriv,
  Encoding,
  randomBytes,
  scrypt,
} from 'node:crypto';
import { promisify } from 'node:util';

@Injectable()
export class CryptoService {

  constructor(
    private readonly configService: ConfigService
  ) {
    this.#algorithm = this.configService.get<string>('CRYPTO_ALGORITHM')!;
    this.#keyPromise = promisify(scrypt)(
      this.configService.get<string>('CRYPTO_PASSWORD')!,
      this.configService.get<string>('CRYPTO_SALT')!,
      32
    ) as Promise<Buffer>;
  }

  #algorithm: string;
  #keyPromise: Promise<Buffer>;
  #iv = randomBytes(16);

  async encode(textToEncrypt: string, inputEncoding?: Encoding, outputEncoding?: Encoding) {
    const key = await this.#keyPromise;
    const cipher = createCipheriv(this.#algorithm, key, randomBytes(16));
    const encryptedBuffer = Buffer.concat([
      cipher.update(textToEncrypt, inputEncoding!),
      cipher.final(),
    ]);
    return encryptedBuffer.toString(outputEncoding);
  }

  async decode(
    encryptedText: string,
    inputEncoding?: BufferEncoding,
    outputEncoding?: BufferEncoding,
  ) {
    const key = await this.#keyPromise;
    const decipher = createDecipheriv(this.#algorithm, key, this.#iv);
    const decryptedBuffer = Buffer.concat([
      decipher.update(encryptedText, inputEncoding!),
      decipher.final(),
    ]);
    return decryptedBuffer.toString(outputEncoding);
  }
}
