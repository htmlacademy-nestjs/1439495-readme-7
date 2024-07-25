import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { UserConfigModule } from '@project/config';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    UserConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
