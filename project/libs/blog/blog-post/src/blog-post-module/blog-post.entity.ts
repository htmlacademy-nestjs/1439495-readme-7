import { Entity, Post, StorableEntity, PostType } from '@project/shared-core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public userId: string;
  public type: PostType;
  public isDraft: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public publishDate: Date
  public tags: string[];

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post) {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.userId = post.userId;
    this.type = post.type;
    this.isDraft = post.isDraft;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.publishDate = post.publishDate;
    this.tags = post.tags ?? [];
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      isDraft: this.isDraft,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishDate: this.publishDate,
      tags: this.tags
    }
  }
}
