import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { ServiceService } from './service/service.service';

@Module({
  controllers: [UserController],
  providers: [ServiceService]
})
export class UserModule {}
