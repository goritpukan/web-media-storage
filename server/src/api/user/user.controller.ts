import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessGuard } from '../../security/jwt/access/access.guard';
import { MapInterceptor } from '@automapper/nestjs';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { AdminGuard } from '../../security/jwt/roles/admin.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AdminOrMeGuard } from '../../security/jwt/roles/admin-or-me.guard';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'Return mapped user', type: UserDto })
  @ApiParam({ name: 'id' })
  @UseGuards(AccessGuard, AdminOrMeGuard)
  @Get('/:id')
  @UseInterceptors(MapInterceptor(UserEntity, UserDto))
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Return mapped users', type: UserDto })
  @UseGuards(AccessGuard, AdminGuard)
  @Get()
  @UseInterceptors(MapInterceptor(UserEntity, UserDto, { isArray: true }))
  async getAllUsers(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({ description: 'Return mapped created user', type: UserDto })
  @UseGuards(AccessGuard, AdminGuard)
  @Post()
  @UseInterceptors(MapInterceptor(UserEntity, UserDto))
  async createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ description: 'Return mapped updated user' })
  @ApiParam({ name: 'id' })
  @UseGuards(AccessGuard, AdminOrMeGuard)
  @Patch('/:id')
  @UseInterceptors(MapInterceptor(UserEntity, UserDto))
  async updateUserById(
    @Body() body: CreateUserDto,
    @Param('id') id: string,
  ): Promise<UserDto> {
    return this.userService.updateUserById(id, body);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiOkResponse({ description: 'Return mapped deleted user' })
  @ApiParam({ name: 'id' })
  @UseGuards(AccessGuard, AdminOrMeGuard)
  @Delete('/:id')
  @UseInterceptors(MapInterceptor(UserEntity, UserDto))
  async deleteUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUserById(id);
  }
}
