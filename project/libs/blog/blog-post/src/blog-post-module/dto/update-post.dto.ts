import { ApiProperty } from '@nestjs/swagger';
import { PostType, Tag } from '@project/shared-core';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post author user ID',
    example: '658170cbb954e9f5b905ccf4'
  })
  public userId: string;

  @ApiProperty({
    description: 'Type of publication',
    example: 'Video'
  })
  public type?: PostType;

  @ApiProperty({
    description: 'Draft or not',
    example: 'false'
  })
  public isDraft?: boolean;

  @ApiProperty({
    description: 'Date of publication',
    example: '2024-08-06'
  })
  public publishDate?: Date

  @ApiProperty({
    description: 'Tags for publication',
    example: 'tag'
  })
  public tags?: Tag[];
}
