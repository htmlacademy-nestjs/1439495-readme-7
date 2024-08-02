import { Module } from '@nestjs/common';
import { BlogPostModule } from '@project/blog-post'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BlogPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
