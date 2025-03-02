import { AutoMap } from '@automapper/classes';
import { Roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Id of the user',
  })
  @AutoMap()
  id: string;

  @ApiProperty({
    description: 'Email of the user',
  })
  @AutoMap()
  email: string;

  @ApiProperty({
    description: 'First name of the user',
  })
  @AutoMap()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
  })
  @AutoMap()
  lastName: string;

  @ApiProperty({
    description: 'Role of the  user',
  })
  @AutoMap(() => String)
  role: Roles;
}
