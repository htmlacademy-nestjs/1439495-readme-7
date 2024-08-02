import { Expose } from 'class-transformer';
import { PostType } from '@project/shared-core';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public type: PostType;

  @Expose()
  public isDraft: boolean;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public publishDate: Date

  @Expose()
  public tags: string[];
}
