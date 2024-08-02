import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { Post } from '@project/shared-core';
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
    const documents = await this.client.post.findMany();

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const record = await this.client.post.create({
      data: {...entity.toPOJO()}
    });

    entity.id = record.id;
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

