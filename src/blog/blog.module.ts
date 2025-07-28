import { Module } from '@nestjs/common';
import { BlogController } from './controller/blog.controller';
import { BlogService } from './service/blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entity/Blog';

@Module({
  imports:[TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
