import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';

export class CreateCommentDto {

  public userId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem ipsum...'
  })
  @IsString()
  @MinLength(10, { message: BlogCommentValidateMessage.TextMinLength })
  @MaxLength(300, { message: BlogCommentValidateMessage.TextMaxLength })
  public text: string;
}
