import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoProfile } from './video.profile';

@Module({
  controllers: [VideoController],
  providers: [VideoService, VideoProfile],
})
export class VideoModule {}