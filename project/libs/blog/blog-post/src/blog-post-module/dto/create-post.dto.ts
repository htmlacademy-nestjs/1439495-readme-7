import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared-core';

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
}
