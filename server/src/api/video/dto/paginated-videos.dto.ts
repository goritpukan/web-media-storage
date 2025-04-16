import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

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
    description: 'Url of the preview',
  })
  @AutoMap()
  previewUrl: string;
}
