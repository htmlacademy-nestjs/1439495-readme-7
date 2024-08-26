import { Controller, Get, Param, Post, Body, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared-helpers';
import { BlogCommentService } from './blog-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('posts/:id/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK
  })
  @Get('/')
  public async index(@Param('id') id: string) {
    const blogCommentEntities = await this.blogCommentService.getAllCommentsToPost(id);
    const comments = blogCommentEntities.map((comment) => comment.toPOJO());
    return fillDto(CommentRdo, comments);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment was created',
  })
  @Post('/')
  public async create(@Body() dto: CreateCommentDto, @Param('id') id: string) {
    const newComment = await this.blogCommentService.createComment(dto, id);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment was deleted',
  })
  @Delete('/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('commentId') commentId: string) {
    await this.blogCommentService.deleteCommentById(commentId);
  }

  @Get('/:commentId')
  public async getCommentInfo(@Param('commentId') commentId: string) {
    const comment = await this.blogCommentService.getComment(commentId);
    return fillDto(CommentRdo, comment);
  }
}
