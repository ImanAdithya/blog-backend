import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('blog')
export class BlogController {
    constructor(private blogService:BlogService){}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Get('user/:userId')
    getPostsByUser(@Param('userId') userId: number) {
    return this.blogService.findByUserId(userId);
  }


  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.blogService.delete(id);
  }
}
