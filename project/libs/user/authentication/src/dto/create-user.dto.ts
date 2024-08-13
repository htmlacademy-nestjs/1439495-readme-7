import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'ivanov@mail.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov'
  })
  @IsString({ message: AuthenticationValidateMessage.NameNotValid })
  @MinLength(3, { message: AuthenticationValidateMessage.NameMinLength })
  @MaxLength(50, { message: AuthenticationValidateMessage.NameMaxLength })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123'
  })
  @IsString()
  @MinLength(6, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(12, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: '/avatar.jpg'
  })
  @IsOptional()
  @IsString()
  public avatar?: string;
}
