import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'ivanov@mail.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123'
  })
  @IsString()
  @MinLength(6, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(12, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;
}
