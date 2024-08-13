import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Comment author user ID',
    example: '658170cbb954e9f5b905ccf4'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Post ID',
    example: '6d308040-96a2-4162-bea6-2338e9976540'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem ipsum...'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Comment creation date',
    example: '2024-08-06'
  })
  @Expose()
  public createdAt: Date;
}
