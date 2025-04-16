import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadFiles } from '../../types/video/upload-files.interface';
import { GetUser } from '../../decorators/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { AdminGuard } from '../../security/jwt/roles/admin.guard';
import { AccessGuard } from '../../security/jwt/access/access.guard';

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(AccessGuard, AdminGuard)
  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'preview', maxCount: 1 },
    ]),
  )
  async createVideo(
    @UploadedFiles() files: UploadFiles,
    @Body() createVideoDto: CreateVideoDto,
    @GetUser() user: UserEntity,
  ) {
    return this.videoService.createVideo(createVideoDto, files, user);
  }
}
