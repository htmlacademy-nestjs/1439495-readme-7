import dayjs from 'dayjs';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AUTH_USER_INVALID, REGISTER_USER_CONFLICT, USER_NOT_FOUND } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
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
}
