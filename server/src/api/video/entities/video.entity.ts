import { AutoMap } from '@automapper/classes';
import { VideoAccessibility } from '@prisma/client';

export class VideoEntity{
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

  @AutoMap()
  accessibility: VideoAccessibility;
}