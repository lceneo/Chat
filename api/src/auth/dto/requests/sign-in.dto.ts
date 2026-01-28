import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  loginId: string;
}
