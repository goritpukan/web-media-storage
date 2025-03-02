import { AutoMap } from '@automapper/classes';
import { Roles } from '@prisma/client';

export class UserDto {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap(() => String)
  role: Roles;
}
