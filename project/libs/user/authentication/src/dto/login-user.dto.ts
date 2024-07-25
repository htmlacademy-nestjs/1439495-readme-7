import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'ivanov@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123'
  })
  public password: string;
}
