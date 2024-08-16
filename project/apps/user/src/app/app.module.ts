import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { UserConfigModule, getMongooseOptions } from '@project/config';
import { NotifyModule } from '@project/user-notify';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    UserConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
