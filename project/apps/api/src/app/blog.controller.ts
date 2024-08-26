import 'multer';
import { Express } from 'express';
import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors, UploadedFile, Patch, Param, ForbiddenException, Delete, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { CreatePostDto, UpdatePostDto } from '@project/blog-post';
import { CreateCommentDto } from '@project/blog-comment';
import { InjectUserIdInterceptor } from '@project/interceptors';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Get('/')
  public async showPosts(@Query() query) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/`, { params: { ...query } });
    return data;
  }

  @Get('/:id')
  public async showPostInfo(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  public async create(@Body() dto: CreatePostDto, @UploadedFile() file?: Express.Multer.File) {
    let photo = '';

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
      photo = fileData.id;
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, photo ? {...dto, content: {photo}} : dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:id')
  public async editPost(@Body() dto: UpdatePostDto, @Param('id') id: string) {
    const { data: postInfo } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    if (dto.userId !== postInfo.userId) {
      throw new ForbiddenException('You can only edit your own post');
    }
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/:id')
  public async deletePost(@Body() { userId }: { userId: string }, @Param('id') id: string) {
    const { data: postInfo } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    if (userId !== postInfo.userId) {
      throw new ForbiddenException('You can only delete your own post');
    }
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:id/like')
  public async addLike(@Body() { userId }: { userId: string }, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${id}/like`, {userId});
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/:id/like')
  public async deleteLike(@Body() { userId }: { userId: string }, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}/like`, {userId});
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:id/comments')
  public async addComment(@Body() dto: CreateCommentDto, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${id}/comments`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/:id/comments/:commentId')
  public async deleteComment(@Body() { userId }: { userId: string }, @Param('id') id: string, @Param('commentId') commentId: string) {
    const { data: commentInfo } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}/comments/${commentId}`);
    if (userId !== commentInfo.userId) {
      throw new ForbiddenException('You can only delete your own comment');
    }
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}/comments/${commentId}`);
    return data;
  }

  @Get('/:id/comments')
  public async getAllComments(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}/comments`);
    return data;
  }

  @Post('/search')
  public async searchPosts(@Body() { title }: { title: string }) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/search`, {title});
    return data;
  }
}
