import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from '../service/blog.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';


// 🧪 Mock BlogService
const mockBlogService = {
  create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
  findAll: jest.fn().mockReturnValue([{ id: 1, title: 'Test Post' }]),
  findOne: jest.fn().mockImplementation((id) => ({ id, title: 'Sample' })),
  findByUserId: jest.fn().mockImplementation((userId) => [{ id: 1, userId }]),
  update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
  delete: jest.fn().mockImplementation((id) => ({ deleted: true })),
};

// ✅ Mock JwtAuthGuard to always allow access
const mockJwtAuthGuard = {
  canActivate: (context: ExecutionContext) => true,
};

describe('BlogController', () => {
  let controller: BlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [{ provide: BlogService, useValue: mockBlogService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a blog post', async () => {
    const dto: CreateBlogDto = { title: 'Test', description: 'Content', userId: 1 };
    expect(await controller.create(dto)).toEqual({
      id: 1,
      ...dto,
    });
  });

  it('should return all blog posts', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, title: 'Test Post' }]);
  });

  it('should return one blog post by id', async () => {
    expect(await controller.findOne(5)).toEqual({ id: 5, title: 'Sample' });
  });

  it('should return all posts by user', async () => {
    expect(await controller.getPostsByUser(2)).toEqual([{ id: 1, userId: 2 }]);
  });

  it('should update a blog post', async () => {
    const dto: UpdateBlogDto = { title: 'Updated', description: 'Updated content' };
    expect(await controller.update(3, dto)).toEqual({
      id: 3,
      ...dto,
    });
  });

  it('should delete a blog post', async () => {
    expect(await controller.delete(4)).toEqual({ deleted: true });
  });
});
