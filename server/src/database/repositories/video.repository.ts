import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { VideoEntity } from '../../api/video/entities/video.entity';

@Injectable()
export class VideoRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(args?: Prisma.VideoFindManyArgs): Promise<VideoEntity[]> {
    return this.prisma.video.findMany(args);
  }

  async findById(
    id: string,
    args?: Omit<Prisma.VideoFindUniqueArgs, 'where'>,
  ): Promise<VideoEntity> {
    return this.prisma.video.findUnique({
      where: { id },
      ...args,
    });
  }

  async find(args?: Prisma.VideoFindFirstArgs): Promise<VideoEntity> {
    return this.prisma.video.findFirst(args);
  }

  async create(data: Prisma.VideoCreateInput): Promise<VideoEntity> {
    return this.prisma.video.create({
      data,
    });
  }

  async updateById(
    id: string,
    data: Prisma.VideoUpdateInput,
  ): Promise<VideoEntity> {
    return this.prisma.video.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<VideoEntity> {
    return this.prisma.video.delete({
      where: { id },
    });
  }

  async deleteMany(args?: Prisma.VideoDeleteManyArgs) {
    return this.prisma.video.deleteMany(args);
  }
}
