import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadFiles } from '../../types/video/upload-files.interface';
import { GetUser } from '../../decorators/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { AccessGuard } from '../../security/jwt/access/access.guard';
import { VideoEntity } from './entities/video.entity';
import { MapInterceptor } from '@automapper/nestjs';
import { PaginatedVideosDto } from './dto/paginated-videos.dto';
import { FilesValidationPipe } from '../../pipes/files-validation.pipe';
import { VideoDto } from './dto/video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @ApiOperation({ summary: 'Create new video' })
  @ApiOkResponse({
    description: 'Return mapped video',
    type: PaginatedVideosDto,
  })
  @UseGuards(AccessGuard)
  @Post('/')
  @UseInterceptors(MapInterceptor(VideoEntity, PaginatedVideosDto))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'preview', maxCount: 1 },
    ]),
  )
  async createVideo(
    @UploadedFiles(new FilesValidationPipe()) files: UploadFiles,
    @Body() createVideoDto: CreateVideoDto,
    @GetUser() user: UserEntity,
  ): Promise<PaginatedVideosDto> {
    return this.videoService.createVideo(createVideoDto, files, user);
  }

  @ApiOperation({ summary: 'Get all videos' })
  @ApiOkResponse({
    description: 'Return mapped videos',
    type: PaginatedVideosDto,
  })
  @Get('/')
  @UseInterceptors(
    MapInterceptor(VideoEntity, PaginatedVideosDto, { isArray: true }),
  )
  async getAllVideos(): Promise<PaginatedVideosDto[]> {
    return this.videoService.getAllVideos();
  }

  @ApiOperation({ summary: 'Get video by id' })
  @ApiOkResponse({
    description: 'Return video by id',
    type: VideoDto,
  })
  @Get('/:id')
  @UseInterceptors(MapInterceptor(VideoEntity, VideoDto))
  async getVideoById(@Param('id') id: string): Promise<PaginatedVideosDto> {
    return this.videoService.getVideoById(id);
  }

  @ApiOperation({ summary: 'Delete video by id' })
  @ApiOkResponse({
    description: 'Return deleted mapped video',
    type: VideoDto,
  })
  @UseGuards(AccessGuard)
  @Delete('/:id')
  @UseInterceptors(MapInterceptor(VideoEntity, VideoDto))
  async deleteVideoById(@Param('id') id: string): Promise<VideoDto> {
    return this.videoService.deleteVideoById(id);
  }

  @ApiOperation({ summary: 'Update video by id' })
  @ApiOkResponse({
    description: 'Return updated mapped video',
    type: VideoDto,
  })
  @UseGuards(AccessGuard)
  @Patch('/:id')
  @UseInterceptors(MapInterceptor(VideoEntity, VideoDto))
  async updateVideoById(
    @Param('id') id: string,
    @Body() body: UpdateVideoDto,
  ): Promise<VideoDto> {
    return this.videoService.updateVideoById(id, body);
  }
}
