import 'multer';
import { Express } from 'express';
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';
import { Body, Controller, Post, Patch, Req, UseFilters, UseInterceptors, UploadedFile, UseGuards, Get, Param } from '@nestjs/common';
import { LoginUserDto, CreateUserDto, PasswordDto } from '@project/authentication';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  public async register(@Body() userDto: CreateUserDto, @UploadedFile() file?: Express.Multer.File) {
    let avatar = '';

    if (file) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append('file', file.buffer, { filename: file.originalname });
      const headers = {
          ...formData.getHeaders(),
          "Content-Length": formData.getLengthSync()
      };

      const { data: fileData } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData, { headers });
      avatar = fileData.id;
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, { ...userDto, avatar });
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @Patch('password')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async changePassword(@Body() passwordDto: PasswordDto) {
    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/password`, passwordDto);
  }

  @Get('/:id')
  public async showUserInfo(@Param('id') id: string) {
    const { data: userInfo } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/info/${id}`);
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user/${id}`);
    return {
      userId: id,
      dateOfRegistry: userInfo.dateOfRegistry,
      postsCount: data.postsCount,
      subscribersCount: data.subscribersCount
    }
  }

}
