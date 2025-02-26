import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.refreshToken.findUnique({
      where: {
        id,
      },
    });
  }

  find(where: Prisma.RefreshTokenWhereInput) {
    return this.prisma.refreshToken.findFirst({
      where,
    });
  }

  findMany(args?: Prisma.RefreshTokenFindManyArgs) {
    return this.prisma.refreshToken.findMany(args);
  }

  create(data: Prisma.RefreshTokenCreateInput) {
    return this.prisma.refreshToken.create({ data });
  }

  updateById(id: string, data: Prisma.RefreshTokenUpdateInput) {
    return this.prisma.refreshToken.update({
      where: { id },
      data,
    });
  }
}
