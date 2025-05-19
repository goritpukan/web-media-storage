'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { IAuthContext } from '@/types/authContext';
import { IUser } from '@/types/user';
import api from '@/lib/axios';

export const AuthenticationContext = createContext<IAuthContext>({
  user: null,
  isLoading: true,
  setUser: () => {},
});

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const getUser = async (): Promise<void> => {
    const response = await api.get<IUser>('user/get/me');
    if (response?.status === 200) {
      setUserState(response.data);
    }
    setIsLoading(false)
  };
  useEffect(() => {
    getUser();
  }, []);
  const setUser = (user: IUser) => {
    if (user !== null) {
      setUserState(user);
    }
  };
  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        isLoading: isLoading,
        setUser: setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
