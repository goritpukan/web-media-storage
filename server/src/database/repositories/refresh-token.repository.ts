import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, RefreshToken } from '@prisma/client';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    where?: Prisma.RefreshTokenWhereInput,
  ): Promise<RefreshToken[]> {
    return this.prisma.refreshToken.findMany({
      where,
    });
  }

  async findById(id: string): Promise<RefreshToken> {
    return this.prisma.refreshToken.findUnique({
      where: { id },
    });
  }

  async find(where?: Prisma.RefreshTokenWhereInput): Promise<RefreshToken> {
    return this.prisma.refreshToken.findFirst({
      where,
    });
  }

  async create(data: RefreshToken): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({
      data,
    });
  }

  async updateById(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<RefreshToken> {
    return this.prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteMany(where: Prisma.RefreshTokenWhereInput) {
    return this.prisma.refreshToken.deleteMany({ where });
  }
}
