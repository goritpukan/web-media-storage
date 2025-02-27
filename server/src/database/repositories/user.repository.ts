import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '../../api/user/dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(args?: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }

  async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {id},
    });
  }

  async find(args?: Prisma.UserFindFirstArgs): Promise<User> {
    return this.prisma.user.findFirst(args);
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateById(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: {id},
      data,
    });
  }

  async deleteById(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {id},
    });
  }

  async deleteMany(args?: Prisma.UserDeleteManyArgs){
    return this.prisma.user.deleteMany(args);
  }
}
