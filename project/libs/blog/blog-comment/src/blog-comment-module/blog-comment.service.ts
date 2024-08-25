import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) {}

  public async getAllCommentsToPost(postId: string): Promise<BlogCommentEntity[]> {
    return await this.blogCommentRepository.findAllByPostId(postId);
  }

  public async createComment(dto: CreateCommentDto, postId: string): Promise<BlogCommentEntity> {
    const newComment = new BlogCommentEntity({...dto, postId});
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }

  public async deleteCommentById(id: string): Promise<void> {
    const comment = await this.blogCommentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    await this.blogCommentRepository.deleteById(id);
  }

  public async getComment(id: string): Promise<BlogCommentEntity> {
    return await this.blogCommentRepository.findById(id);
  }
}
