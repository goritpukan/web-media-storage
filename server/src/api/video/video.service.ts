import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VideoRepository } from '../../database/repositories/video.repository';
import { CreateVideoDto } from './dto/create-video.dto';
import { UploadService } from '../../upload/upload.service';
import { UploadFiles } from '../../types/video/upload-files.interface';
import { UserEntity } from '../user/entities/user.entity';
import { VideoEntity } from './entities/video.entity';
import { UpdateVideoDto } from './dto/update-video.dto';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffprobeStatic from 'ffprobe-static';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly uploadService: UploadService,
  ) {
    ffmpeg.setFfprobePath(ffprobeStatic.path);
  }

  async createVideo(
    data: CreateVideoDto,
    files: UploadFiles,
    user: UserEntity,
  ) {
    const duration: number = await this.getVideoDuration(
      files.video[0].buffer,
      files.video[0].originalname,
    );
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
        duration: duration,
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
          },
        },
      },
    });
  }

  async deleteVideoById(id: string): Promise<VideoEntity> {
    const video: VideoEntity = await this.videoRepository.findById(id);
    await Promise.all([
      await this.uploadService.deleteFileByKey(video.videoKey),
      await this.uploadService.deleteFileByKey(video.previewKey),
    ]);
    return this.videoRepository.deleteById(id);
  }

  async updateVideoById(
    id: string,
    data: UpdateVideoDto,
  ): Promise<VideoEntity> {
    return this.videoRepository.updateById(id, data);
  }

  private async getVideoDuration(
    buffer: Buffer,
    originalName: string,
  ): Promise<number> {
    const tempFilePath = path.join(
      os.tmpdir(),
      `${Date.now()}-${originalName}`,
    );
    await fs.writeFile(tempFilePath, buffer);

    const duration = await new Promise<number>((resolve, reject) => {
      ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
        if (err) return reject(err);
        resolve(metadata.format.duration);
      });
    });

    await fs.unlink(tempFilePath);
    return duration;
  }
}
