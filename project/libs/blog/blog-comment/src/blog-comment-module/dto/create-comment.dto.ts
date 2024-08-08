import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment author user ID',
    example: '658170cbb954e9f5b905ccf4'
  })
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId: string;

  @ApiProperty({
    description: 'Post ID',
    example: '6d308040-96a2-4162-bea6-2338e9976540'
  })
  @IsString()
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem ipsum...'
  })
  @IsString()
  @MinLength(10, { message: BlogCommentValidateMessage.TextMinLength })
  @MaxLength(300, { message: BlogCommentValidateMessage.TextMaxLength })
  public text: string;
}
