import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entity/Blog';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
     constructor(@InjectRepository(Blog) private userRepository : Repository<Blog>){
        
     }
    
}
