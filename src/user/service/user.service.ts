import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { UserParams } from 'src/util/type';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>){}

    createUser(user:UserParams){
        this.userRepository.create(user);
    }
}
