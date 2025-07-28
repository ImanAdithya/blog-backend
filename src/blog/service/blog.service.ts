import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entity/Blog';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog) private blogRepository: Repository<Blog>,
        @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(dto: CreateBlogDto) {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const blog = this.blogRepository.create({
      title: dto.title,
      description: dto.description,
      user,
    });

    await this.blogRepository.save(blog);

    return { code: 200, message: 'Blog created', data: blog };
  }

  async findAll() {
    const blogs = await this.blogRepository.find();
    return { code: 200, message: 'Success', data: blogs };
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) throw new NotFoundException('Blog not found');
    return { code: 200, message: 'Success', data: blog };
  }

  async update(id: number, dto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) throw new NotFoundException('Blog not found');

    blog.title = dto.title ?? blog.title;
    blog.description = dto.description ?? blog.description;

    await this.blogRepository.save(blog);
    return { code: 200, message: 'Updated successfully', data: blog };
  }

  async delete(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) throw new NotFoundException('Blog not found');
    await this.blogRepository.remove(blog);
    return { code: 200, message: 'Deleted successfully', data: null };
  }

}
