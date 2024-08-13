import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared-core';

export class PostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Type of publication',
    example: 'Link'
  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    description: 'Draft or not',
    example: 'false'
  })
  @Expose()
  public isDraft: boolean;

  @ApiProperty({
    description: 'Date of publication',
    example: '2024-08-06'
  })
  @Expose()
  public publishDate: Date

  @ApiProperty({
    description: 'Tags for publication',
    example: 'example'
  })
  @Expose()
  public tags: string[];

  @Expose()
  public content;

  @Expose()
  public commentsCount: number;

  @Expose()
  public likesCount: number;
}
