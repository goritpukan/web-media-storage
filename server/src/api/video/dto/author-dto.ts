import { AutoMap } from '@automapper/classes';

export class AuthorDto {
  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;
}
