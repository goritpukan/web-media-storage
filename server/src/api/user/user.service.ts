import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    return this.userRepository.create(data);
  }

  async getUser(data: Prisma.UserWhereInput): Promise<User> {
    return this.userRepository.find({ where: data });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findMany();
  }

  async updateUserById(id: string, data: CreateUserDto): Promise<User> {
    return this.userRepository.updateById(id, data);
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<User> {
    return await this.userRepository.updateById(id, {
      refreshTokens: {
        create: {
          token: refreshToken,
        },
      },
    });
  }

  async deleteUserById(id: string): Promise<User> {
    return this.userRepository.deleteById(id);
  }
}
