import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateBlogDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('User not found');

      const blog = this.blogRepository.create({
        title: dto.title,
        description: dto.description,
        user,
      });

      await this.blogRepository.save(blog);

      return { code: 200, message: 'Blog created', data: blog };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating blog');
    }
  }

  async findAll() {
    try {
      const blogs = await this.blogRepository.find();
      return { code: 200, message: 'Success', data: blogs };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching blogs');
    }
  }

  async findOne(id: number) {
    try {
      const blog = await this.blogRepository.findOne({ where: { id } });
      if (!blog) throw new NotFoundException('Blog not found');
      return { code: 200, message: 'Success', data: blog };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching blog');
    }
  }

  async update(id: number, dto: UpdateBlogDto) {
    try {
      const blog = await this.blogRepository.findOne({ where: { id } });
      if (!blog) throw new NotFoundException('Blog not found');

      blog.title = dto.title ?? blog.title;
      blog.description = dto.description ?? blog.description;

      await this.blogRepository.save(blog);
      return { code: 200, message: 'Updated successfully', data: blog };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error updating blog');
    }
  }

  async delete(id: number) {
    try {
      const blog = await this.blogRepository.findOne({ where: { id } });
      if (!blog) throw new NotFoundException('Blog not found');
      await this.blogRepository.remove(blog);
      return { code: 200, message: 'Deleted successfully', data: null };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error deleting blog');
    }
  }

  async findByUserId(userId: number) {
    try {
      const blogs = await this.blogRepository.find({
        where: { user: { id: userId } },
      });

      return {
        code: 200,
        message: `Blogs for user ${userId} fetched successfully`,
        data: blogs,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching blogs for user');
    }
  }

  async searchByTitle(title: string) {
    try {
      const blogs = await this.blogRepository
        .createQueryBuilder('blog')
        .where('LOWER(blog.title) LIKE :title', { title: `%${title.toLowerCase()}%` })
        .getMany();

      return {
        code: 200,
        message: `Blogs with title containing '${title}'`,
        data: blogs,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error searching blogs by title');
    }
  }

}
