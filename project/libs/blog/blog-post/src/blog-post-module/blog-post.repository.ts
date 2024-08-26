import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from '@project/blog-models';
import { PaginationResult, Post, TextPost, VideoPost, PhotoPost, LinkPost, QuotePost } from '@project/shared-core';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery } from './blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findAll(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.sortType) {
      orderBy[query.sortType] = query.sortDirection;
    }

    if (query?.type) {
      where.type = query.type;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          _count: {
            select: { comments: true, likes: true }
          },
          link: true,
          text: true,
          video: true,
          photo: true,
          quote: true,
          tags: true
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument({
        ...record,
        commentsCount: record._count.comments,
        likesCount: record._count.likes,
        content: record.link || record.text || record.video || record.photo || record.quote
      })),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount
    }
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        isDraft: pojoEntity.isDraft,
        publishDate: pojoEntity.publishDate,
        userId: pojoEntity.userId,
        type: pojoEntity.type,
        tags: {
          connectOrCreate: entity.tags?.map(({ name }) => ({ where: { name }, create: { name } })) ?? []
        }
      }
    });
    entity.id = record.id;

    switch(pojoEntity.type) {
      case 'Video':
        await this.client.video.create({
          data: {...pojoEntity.content as VideoPost, postId: record.id}
        })
        break;
      case 'Text':
        await this.client.text.create({
          data: {...pojoEntity.content as TextPost, postId: record.id}
        })
        break;
      case 'Quote':
        await this.client.quote.create({
          data: {...pojoEntity.content as QuotePost, postId: record.id}
        })
        break;
      case 'Photo':
        await this.client.photo.create({
          data: {...pojoEntity.content as PhotoPost, postId: record.id}
        })
        break;
      case 'Link':
        await this.client.link.create({
          data: {...pojoEntity.content as LinkPost, postId: record.id}
        })
        break;
    }
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: { comments: true, likes: true }
        },
        link: true,
        text: true,
        video: true,
        photo: true,
        quote: true
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument({
      ...document,
      commentsCount: document._count.comments,
      likesCount: document._count.likes,
      content: document.link || document.text || document.video || document.photo || document.quote
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        isDraft: pojoEntity.isDraft,
        publishDate: pojoEntity.publishDate,
        userId: pojoEntity.userId,
        type: pojoEntity.type,
        tags: {
          connectOrCreate: entity.tags?.map(({ name }) => ({ where: { name }, create: { name } })) ?? []
        }
      },
      include: {
        comments: true,
        link: true,
        text: true,
        video: true,
        photo: true,
        quote: true
      }
    });
  }

  public async getPostsCountForAuthor(userId: string): Promise<number> {
    return this.getPostCount({userId});
  }

  public async getSubscribersCount(userId: string): Promise<number> {
    return this.client.subscriber.count({ where: { authorId: userId } });
  }

  public async addLike(userId: string, postId: string) {
    await this.client.like.create({
      data: { userId, postId }
    });
    return this.findById(postId);
  }

  public async deleteLike(userId: string, postId: string) {
    await this.client.like.delete({
      where: {
        postId_userId: {postId, userId}
      }
    })
    return this.findById(postId);
  }

  public async searchPosts(title: string) {
    const textPosts = await this.client.text.findMany({
      where: {title},
      include: {
        post: true
      }
    })
    const videoPosts = await this.client.video.findMany({
      where: {title},
      include: {
        post: true
      }
    })
    return [...textPosts, ...videoPosts];
  }
}

