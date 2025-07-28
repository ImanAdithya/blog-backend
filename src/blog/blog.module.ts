import { Module } from '@nestjs/common';
import { BlogController } from './controller/blog.controller';
import { BlogService } from './service/blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entity/Blog';
import { User } from 'src/entity/User';

@Module({
  imports:[TypeOrmModule.forFeature([Blog,User])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
