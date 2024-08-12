import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared-core';
import { TextPostDto } from './content-dto/text-post.dto';
import { VideoPostDto } from './content-dto/video-post.dto';
import { LinkPostDto } from './content-dto/link-post.dto';
import { QuotePostDto } from './content-dto/quote-post.dto';
import { PhotoPostDto } from './content-dto/photo-post.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post author user ID',
    example: '658170cbb954e9f5b905ccf4'
  })
  public userId: string;

  @ApiProperty({
    description: 'Type of publication',
    example: 'Video'
  })
  public type: PostType;

  @ApiProperty({
    description: 'Draft or not',
    example: 'false'
  })
  public isDraft: boolean;

  @ApiProperty({
    description: 'Date of publication',
    example: '2024-08-11T10:46:24.434Z'
  })
  public publishDate: Date

  @ApiProperty({
    description: 'Tags for publication',
    example: '[]'
  })
  public tags?: string[];

  public content: TextPostDto | VideoPostDto | LinkPostDto | QuotePostDto | PhotoPostDto;
}
