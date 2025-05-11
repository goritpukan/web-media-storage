import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { VideoEntity } from './entities/video.entity';
import { PaginatedVideosDto } from './dto/paginated-videos.dto';
import { VideoDto } from './dto/video.dto';
import { AuthorDto } from './dto/author-dto';

@Injectable()
export class VideoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, VideoEntity, AuthorDto)
      createMap(mapper, VideoEntity, PaginatedVideosDto);
      createMap(mapper, VideoEntity, VideoDto);
    };
  }
}
