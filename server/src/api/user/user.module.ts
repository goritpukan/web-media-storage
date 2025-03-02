import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccessModule } from '../../security/jwt/access.module';
import { UserProfile } from './user.profile';

@Module({
  imports: [AccessModule],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService, UserProfile],
})
export class UserModule {}
