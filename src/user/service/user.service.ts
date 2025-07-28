import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/register.dto';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(dto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating user');
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error finding user');
    }
  }
}
