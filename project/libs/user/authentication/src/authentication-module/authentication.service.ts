import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, HttpException, Injectable, Inject, Logger, NotFoundException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AUTH_USER_INVALID, REGISTER_USER_CONFLICT, USER_NOT_FOUND } from './authentication.constant';
import { Token, TokenPayload, User } from '@project/shared-core';
import { createJWTPayload } from '@project/shared-helpers';
import { jwtConfig } from '@project/config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
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
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }
}
