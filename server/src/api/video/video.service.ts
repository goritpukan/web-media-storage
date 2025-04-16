import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VideoRepository } from '../../database/repositories/video.repository';
import { CreateVideoDto } from './dto/create-video.dto';
import { UploadService } from '../../upload/upload.service';
import { UploadFiles } from '../../types/video/upload-files.interface';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly uploadService: UploadService,
  ) {
  }

  async createVideo(data: CreateVideoDto, files: UploadFiles, user: UserEntity) {
    let previewKey: string | null = null;
    let videoKey: string | null = null;
    try {
      [previewKey, videoKey] = await Promise.all([
        this.uploadService.uploadFile(files.video[0]),
        this.uploadService.uploadFile(files.preview[0]),
      ]);
      return await this.videoRepository.create({
          ...data,
          videoKey,
          previewKey,
          user: {
            connect: {id: user.id},
          },
        },
      )
    } catch (error) {
      await Promise.all([
        this.uploadService.deleteFileByKey(videoKey),
        this.uploadService.deleteFileByKey(previewKey)
      ])

        throw new InternalServerErrorException();
    }
  }
}