import { Entity, Comment, StorableEntity } from '@project/shared-core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  public userId: string;
  public postId: string;
  public text: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment) {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.userId = comment.userId;
    this.postId = comment.postId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      userId: this.userId,
      postId: this.postId,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
