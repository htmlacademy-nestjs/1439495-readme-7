import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class PasswordDto {
  public userId: string;

  @ApiProperty({
    description: 'User old password',
    example: 'qwerty123'
  })
  @IsString()
  @MinLength(6, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(12, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public oldPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: 'qwer2ty123'
  })
  @IsString()
  @MinLength(6, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(12, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public newPassword: string;
}
