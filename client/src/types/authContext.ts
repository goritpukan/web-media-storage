import { IUser } from '@/types/user';

export interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
}