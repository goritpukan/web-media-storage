'use client'

import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { IAuthContext } from '@/types/authContext';
import { IUser } from '@/types/user';
import api from '@/lib/axios';

export const AuthenticationContext = createContext<IAuthContext>({
  user: null,
  setUser: (user: IUser) => {}
})

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<IUser | null>(null);
  const getUser = async(): Promise<void> => {
    const response = await api.get<IUser>('user/get/me');
    if(response?.status === 200){
      setUser(response.data);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  const setUser = (user: IUser) => {
    if(user !== null){
      setUserState(user)
    }
  }
  return(
    <AuthenticationContext.Provider value={{
      user: user,
      setUser: setUser,
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationProvider;