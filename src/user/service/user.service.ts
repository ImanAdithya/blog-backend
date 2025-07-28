import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/register.dto';
import { User } from 'src/entity/User';
import { UserParams } from 'src/util/type';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>){}

async createUser(dto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
}

async findByUsername(username: string): Promise<User | null> {
  return this.userRepository.findOne({ where: { username } });
}

}
