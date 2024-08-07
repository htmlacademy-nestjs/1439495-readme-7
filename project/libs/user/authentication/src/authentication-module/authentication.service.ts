import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, HttpException, Injectable, Logger, NotFoundException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AUTH_USER_INVALID, REGISTER_USER_CONFLICT, USER_NOT_FOUND } from './authentication.constant';
import { Token, TokenPayload, User } from '@project/shared-core';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, name, password, avatar } = dto;
    const existingUser = await this.blogUserRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(REGISTER_USER_CONFLICT);
    }

    const blogUser = {
      email,
      name,
      avatar,
      dateOfRegistry: dayjs().toDate(),
      passwordHash: ''
    }
    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    await this.blogUserRepository.save(userEntity);
    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existingUser = await this.blogUserRepository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException(AUTH_USER_INVALID);
    }

    const isCorrectPassword = await existingUser.comparePassword(password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(AUTH_USER_INVALID);
    }

    return existingUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      dateOfRegistry: user.dateOfRegistry,
      avatar: user.avatar
    }
    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
