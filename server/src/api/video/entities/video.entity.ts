import { AutoMap } from '@automapper/classes';

export class VideoEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  authorId: string;

  @AutoMap()
  videoKey: string;

  @AutoMap()
  videoUrl: string;

  @AutoMap()
  previewKey: string;

  @AutoMap()
  previewUrl: string;
}
