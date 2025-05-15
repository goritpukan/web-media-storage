import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { AuthorDto } from './author-dto';

export class VideoDto {
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
    description: 'Description of the video',
  })
  @AutoMap()
  description: string;

  @ApiProperty({
    description: 'Author Id',
  })
  @AutoMap()
  authorId: string;

  @ApiProperty({
    description: 'Author of the video',
  })
  @AutoMap(() => AuthorDto)
  author?: AuthorDto;

  @ApiProperty({
    description: 'Url of the video',
  })
  @AutoMap()
  videoUrl: string;

  @ApiProperty({
    description: 'Video creation date',
  })
  @AutoMap()
  createdAt: Date;
}
