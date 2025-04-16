import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoProfile } from './video.profile';
import { UploadModule } from '../../upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [VideoController],
  providers: [VideoService, VideoProfile],
})
export class VideoModule {}
