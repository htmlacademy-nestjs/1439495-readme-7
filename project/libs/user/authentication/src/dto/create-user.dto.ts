import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'ivanov@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov'
  })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123'
  })
  public password: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: '/avatar.jpg'
  })
  public avatar?: string;
}
