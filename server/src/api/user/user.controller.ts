import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessGuard } from '../../security/jwt/access/access.guard';
import { MapInterceptor } from '@automapper/nestjs';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessGuard)
  @Post()
  @UseInterceptors(MapInterceptor(UserEntity, UserDto))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }
}
