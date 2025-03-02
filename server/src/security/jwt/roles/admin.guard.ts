import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Roles } from '@prisma/client';
import { NoPermissionException } from '../../exceptions/no-permission-exception';
import AuthenticatedRequest from './authenticated-request';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (user?.role !== Roles.ADMIN) {
      throw new NoPermissionException();
    }
    return true;
  }
}
