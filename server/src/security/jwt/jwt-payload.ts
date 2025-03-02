import { Roles } from '@prisma/client';

export class JwtPayload {
  sub: string;
  role: Roles;
}
