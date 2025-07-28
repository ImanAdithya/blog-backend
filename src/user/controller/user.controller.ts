import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/User.dto';

@Controller('user')
export class UserController {
    constructor(private userservice:UserService){}

    @Post()
    createUser(@Body() userDto: UserDto) {
        return this.userservice.createUser(userDto);
    } 

}
