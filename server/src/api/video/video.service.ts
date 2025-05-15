import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VideoRepository } from '../../database/repositories/video.repository';
import { CreateVideoDto } from './dto/create-video.dto';
import { UploadService } from '../../upload/upload.service';
import { UploadFiles } from '../../types/video/upload-files.interface';
import { UserEntity } from '../user/entities/user.entity';
import { VideoEntity } from './entities/video.entity';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly uploadService: UploadService,
  ) {}

  async createVideo(
    data: CreateVideoDto,
    files: UploadFiles,
    user: UserEntity,
  ) {
    let previewKey: string | null = null;
    let videoKey: string | null = null;
    try {
      [videoKey, previewKey] = await Promise.all([
        this.uploadService.uploadFile(files.video[0]),
        this.uploadService.uploadFile(files.preview[0]),
      ]);
      return await this.videoRepository.create({
        ...data,
        videoKey,
        videoUrl: this.uploadService.getPublicUrl(videoKey),
        previewKey,
        previewUrl: this.uploadService.getPublicUrl(previewKey),
        author: {
          connect: { id: user.id },
        },
      });
    } catch (error) {
      await Promise.all([
        videoKey ? this.uploadService.deleteFileByKey(videoKey) : null,
        previewKey ? this.uploadService.deleteFileByKey(previewKey) : null,
      ]);

      throw new InternalServerErrorException();
    }
  }

  async getAllVideos(): Promise<VideoEntity[]> {
    return this.videoRepository.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getVideoById(id: string): Promise<VideoEntity> {
    return this.videoRepository.findById(id, {
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      }
    });
  }

  async deleteVideoById(id: string): Promise<VideoEntity> {
    return this.videoRepository.deleteById(id);
  }

  async updateVideoById(
    id: string,
    data: UpdateVideoDto,
  ): Promise<VideoEntity> {
    return this.videoRepository.updateById(id, data);
  }
}
