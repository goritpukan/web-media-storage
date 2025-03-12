import { Injectable } from '@nestjs/common';
import { VideoRepository } from '../../database/repositories/video.repository';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepository: VideoRepository) {}
}