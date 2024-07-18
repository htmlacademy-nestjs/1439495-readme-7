import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('user')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);
    return user.toPOJO();
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    return user.toPOJO();
  }

  @Get('info/:id')
  public async show(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return user.toPOJO();
  }
}
