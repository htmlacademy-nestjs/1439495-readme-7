import { Injectable } from '@nestjs/common';
import { User, EntityFactory } from '@project/shared-core';
import { BlogUserEntity } from './blog-user.entity';

@Injectable()
export class BlogUserFactory implements EntityFactory<BlogUserEntity> {
  public create(entityPlainData: User): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}
