import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
  }
  async getUserById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findMany();
  }
  async updateUser(id: string, data: CreateUserDto): Promise<User> {
    return this.userRepository.updateById(id, data);
  }
  async deleteUserById(id: string): Promise<User> {
    return this.userRepository.deleteById(id);
  }
}
