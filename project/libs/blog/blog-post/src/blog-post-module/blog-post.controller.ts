import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared-helpers';
import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRdo } from './rdo/post.rdo';
import { BlogPostQuery } from './blog-post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPostById(id);
    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post was created',
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post was updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post was deleted',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogPostService.deletePostById(id);
  }

  @Get('/user/:id')
  public async showCommonInfoForUser(@Param('id') id: string) {
    const authorInfo = await this.blogPostService.getInfoForAuthor(id);
    return authorInfo;
  }

  @Post('/:id/like')
  public async addLike(@Body() {userId}, @Param('id') id: string) {
    const post = await this.blogPostService.addLike(userId, id);
    return fillDto(PostRdo, post.toPOJO());
  }

  @Patch('/:id/like')
  public async deleteLike(@Body() {userId}, @Param('id') id: string) {
    const post = await this.blogPostService.deleteLike(userId, id);
    return fillDto(PostRdo, post.toPOJO());
  }
}
