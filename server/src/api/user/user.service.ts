import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    return this.userRepository.create(data);
  }

  async getUser(data: Prisma.UserWhereInput): Promise<UserEntity> {
    return this.userRepository.find({ where: data });
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findMany();
  }

  async updateUserById(id: string, data: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.updateById(id, data);
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<UserEntity> {
    return await this.userRepository.updateById(id, {
      refreshTokens: {
        create: {
          token: refreshToken,
        },
      },
    });
  }

  async deleteUserById(id: string): Promise<UserEntity> {
    return this.userRepository.deleteById(id);
  }
}
