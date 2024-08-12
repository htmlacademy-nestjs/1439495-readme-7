import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { Post, TextPost, VideoPost, PhotoPost, LinkPost, QuotePost } from '@project/shared-core';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async findAll(): Promise<BlogPostEntity[]> {
    // TODO: Добавить сортировку и лимит по ТЗ
    const documents = await this.client.post.findMany({
      include: {
        comments: true,
        link: true,
        text: true,
        video: true,
        photo: true,
        quote: true
      }
    });
    console.log(documents);
    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const record = await this.client.post.create({
      data: {
        isDraft: entity.isDraft,
        publishDate: entity.publishDate,
        userId: entity.userId,
        type: entity.type,
        tags: entity.tags
      }
    });
    entity.id = record.id;

    /// Пока сделала так, разбираюсь

    switch(entity.type) {
      case 'Video':
        await this.client.video.create({
          data: {...entity.content as VideoPost, postId: record.id}
        })
        break;
      case 'Text':
        await this.client.text.create({
          data: {...entity.content as TextPost, postId: record.id}
        })
        break;
      case 'Quote':
        await this.client.quote.create({
          data: {...entity.content as QuotePost, postId: record.id}
        })
        break;
      case 'Photo':
        await this.client.photo.create({
          data: {...entity.content as PhotoPost, postId: record.id}
        })
        break;
      case 'Link':
        await this.client.link.create({
          data: {...entity.content as LinkPost, postId: record.id}
        })
        break;
    }
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        ...entity,
      }
    });
  }
}

