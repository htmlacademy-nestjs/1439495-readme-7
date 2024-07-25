import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '1qwes2123babd398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'ivanov@mail.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User date of registry',
    example: '2024-07-10'
  })
  @Expose()
  public dateOfRegistry: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: '/avatar.jpg'
  })
  @Expose()
  public avatar: string;
}
