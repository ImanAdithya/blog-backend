import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { UserParams } from 'src/util/type';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>){}

   async createUser(user: UserParams){
   const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);
    return {
      code: 201,
      message: 'User created successfully',
      data: savedUser,
    };
  }
}
