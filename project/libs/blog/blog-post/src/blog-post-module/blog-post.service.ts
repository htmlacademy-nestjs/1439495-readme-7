import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async getAllPosts(): Promise<BlogPostEntity[]> {
    return await this.blogPostRepository.findAll();
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
}
