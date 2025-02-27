import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from '../../api/user/dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where?: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({
      where,
    });
  }

  async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async find(where?: Prisma.UserWhereInput): Promise<User> {
    return this.prisma.user.findFirst({
      where,
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateById(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async deleteMany(where: Prisma.UserWhereInput) {
    return this.prisma.user.deleteMany({ where });
  }
}
