import { AutoMap } from '@automapper/classes';
import { AuthorDto } from '../dto/author-dto';

export class VideoEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  authorId: string;

  @AutoMap(() => AuthorDto)
  author?: AuthorDto

  @AutoMap()
  videoKey: string;

  @AutoMap()
  videoUrl: string;

  @AutoMap()
  previewKey: string;

  @AutoMap()
  previewUrl: string;

  @AutoMap()
  duration: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
