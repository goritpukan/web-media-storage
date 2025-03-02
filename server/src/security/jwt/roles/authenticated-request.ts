import { Request } from 'express';
import { Roles } from '@prisma/client';

export default interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: Roles;
  };
}
