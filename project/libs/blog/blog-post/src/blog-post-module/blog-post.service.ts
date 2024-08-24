import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResult } from '@project/shared-core';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostQuery } from './blog-post.query';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return await this.blogPostRepository.findAll(query);
  }

  public async getPostById(id: string): Promise<BlogPostEntity> {
    return await this.blogPostRepository.findById(id);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = new BlogPostEntity(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const updatePost = new BlogPostEntity({...post, ...dto});
    await this.blogPostRepository.update(updatePost);
    return updatePost;
  }

  public async deletePostById(id: string): Promise<void> {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.blogPostRepository.deleteById(id);
  }

  public async getInfoForAuthor(id: string) {
    const postsCount = await this.blogPostRepository.getPostsCountForAuthor(id);
    const subscribersCount = await this.blogPostRepository.getSubscribersCount(id);
    return { postsCount, subscribersCount };
  }
}
