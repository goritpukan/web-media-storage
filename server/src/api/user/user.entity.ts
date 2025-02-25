import { AutoMap } from '@automapper/classes';
import { Roles } from '@prisma/client';

export class User {
  @AutoMap()
    id: string;

  @AutoMap()
    email: string;

  @AutoMap()
    firstName: string;

  @AutoMap()
    lastName: string;

  password: string;

  @AutoMap()
    role: Roles

  @AutoMap()
    createdAt: Date;

  @AutoMap()
    updatedAt: Date;
}
