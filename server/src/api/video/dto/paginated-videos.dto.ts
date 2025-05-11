import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { AuthorDto } from './author-dto';

export class PaginatedVideosDto {
  @ApiProperty({
    description: 'Id of the video',
  })
  @AutoMap()
  id: string;

  @ApiProperty({
    description: 'Name of the video',
  })
  @AutoMap()
  name: string;

  @ApiProperty({
    description: 'Author of the video',
  })
  @AutoMap(() => AuthorDto)
  author?: AuthorDto;

  @ApiProperty({
    description: 'Url of the preview',
  })
  @AutoMap()
  previewUrl: string;

  @ApiProperty({
    description: 'Duration of the video',
  })
  @AutoMap()
  duration: number;

  @AutoMap()
  createdAt: Date;
}
