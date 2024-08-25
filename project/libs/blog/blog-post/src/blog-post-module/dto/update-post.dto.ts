import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn, IsDateString, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { PostType, Tag } from '@project/shared-core';
import { TextPostDto } from './content-dto/text-post.dto';
import { VideoPostDto } from './content-dto/video-post.dto';
import { LinkPostDto } from './content-dto/link-post.dto';
import { QuotePostDto } from './content-dto/quote-post.dto';
import { PhotoPostDto } from './content-dto/photo-post.dto';

export class UpdatePostDto {
  public userId: string;

  @ApiProperty({
    description: 'Type of publication',
    enum: ['Video', 'Text', 'Quote', 'Photo', 'Link'],
    example: 'Text'
  })
  @IsIn(['Video', 'Text', 'Quote', 'Photo', 'Link'])
  @IsOptional()
  public type: PostType;

  @ApiProperty({
    description: 'Draft or not',
    example: 'false'
  })
  @IsBoolean()
  @IsOptional()
  public isDraft: boolean;

  @ApiProperty({
    description: 'Date of publication',
    example: '2024-08-11T10:46:24.434Z'
  })
  @IsDateString()
  @IsOptional()
  public publishDate: Date

  @ApiProperty({
    description: 'Tags for publication',
    example: '[]'
  })
  @IsArray()
  @IsOptional()
  public tags?: Tag[];

  @ApiProperty({
    description: 'Content for publication',
    example: '{"title": "Пост", "preview": "Краткое описание", "text": "Собственно сам длинный пост"}'
  })
  @IsObject()
  @ValidateNested()
  public content: TextPostDto | VideoPostDto | LinkPostDto | QuotePostDto | PhotoPostDto;
}
