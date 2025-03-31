import {Request} from 'express';
import { UserEntity } from '../../api/user/entities/user.entity';

export interface RequestWithUser extends Request{
  user: UserEntity;
}