import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostFactory } from './blog-post.factory';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogPostRepository, BlogPostService, BlogPostFactory],
  controllers: [BlogPostController],
  exports: [BlogPostService]
})
export class BlogPostModule {}
