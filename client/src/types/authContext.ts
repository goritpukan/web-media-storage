import { IUser } from '@/types/user';

export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser) => void;
}
