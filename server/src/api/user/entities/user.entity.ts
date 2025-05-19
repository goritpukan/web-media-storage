import { AutoMap } from '@automapper/classes';
import { RefreshToken, Roles } from '@prisma/client';

export class UserEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  password: string;

  @AutoMap(() => String)
  role: Roles;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;

  refreshToken?: RefreshToken;
}
