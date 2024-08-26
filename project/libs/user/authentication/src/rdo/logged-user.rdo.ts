import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '1qwes2123babd398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Access token'
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token'
  })
  @Expose()
  public refreshToken: string;
}
