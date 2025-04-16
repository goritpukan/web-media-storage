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
  previewKey: string;
}
